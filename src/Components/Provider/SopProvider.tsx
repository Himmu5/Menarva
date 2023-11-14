import { FC, ReactNode, useEffect, useState } from 'react'
import { getSOP, getSopByCalendar, setTaskStatus, uploadImage } from '../../Axios/Sop';
import { withAlert, withShop, withUser } from '../../HOC/withProvider';
import { AlertType } from '../../Typings/Alert';
import { SopContext } from '../../Context/SopContext';
import { SopCalendar, Sops } from '../../Typings/sops';
import { UserClass } from '../../Typings/User';
import { Shop } from '../../Typings/Shop';
import { useNavigate } from 'react-router-dom';
import { checkResponse } from '../../ErrorHandling/ResponseCheck';

type P = {
    children: ReactNode;
    setAlert: (a: AlertType) => void;
    selectedShop: Shop;
    user: UserClass;
    changeMonth: Date;
    shopId: number;
    accessToken: string;
}

const SopProvider: FC<P> = ({ children, setAlert, selectedShop, user, changeMonth, shopId , accessToken}) => {
    const Navigate = useNavigate();


    const [sops, setSOPS] = useState<Sops[]>();
    const [selectedSop, setSelectedSop] = useState<{ Sops: Sops, taskId: number }>();
    const [sopStatus, setSopStatus] = useState("ALL");
    const [sopCalendar, setSopCalendar] = useState<SopCalendar>();
    const [sopDate, setSopDate] = useState<Date>();
    const [image] = useState<File>()


    useEffect(() => {
        if (selectedShop || user?.role === 2) {
            getSOPs();
        }
    }, [sopDate, selectedShop , user])


    function getSOPs() {
        getSOP(shopId ? shopId : selectedShop?.id, sopDate ,selectedShop?.name! , accessToken).then((res) => {
            setSOPS(res);
        }).catch((err) => {
            setAlert({ type: 'error', message: err.message })
        })
    }

    function getSopCalendar() {
        getSopByCalendar(selectedShop?.id ,selectedShop.name! , accessToken).then((res) => {
            setSopCalendar(res.result)
        })
    }

    useEffect(() => {
        if (selectedShop) {
            getSopCalendar();
        }
    }, [user, selectedShop, changeMonth])

    function uploadSopImage(blob: Blob, sopId: number, taskId: number) {
        const file = new File([blob], 'image.jpg');

        const formData = new FormData();
        formData.append('image', file, "image.jpg");

        uploadImage(formData, sopId, taskId, shopId , accessToken).then((res) => {
            checkResponse(res , setAlert);
            Navigate('/SOP');
            getSOPs();
        }).catch((err) => {
            setAlert({ type: "error", message: err.message });
        })

    }
    function setSopTaskStatus(sopId: string, taskId: number) {
        setTaskStatus(sopId, taskId , accessToken).then((res) => {
            checkResponse(res , setAlert);
            getSOPs();
        })
    }

    return <SopContext.Provider value={{getSOPs, image, Navigate, setSopTaskStatus, setSopDate, sops, uploadSopImage, sopCalendar, setSelectedSop, selectedSop, sopStatus, setSopStatus , sopDate }}>
        {children}
    </SopContext.Provider>
}
export default withAlert(withUser(withShop(withAlert(SopProvider))));