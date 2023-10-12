import { FC, ReactNode, useEffect, useState } from 'react'
import { getSOP, getSopByCalendar, uploadImage } from '../../Axios/Sop';
import { withAlert, withShop, withUser } from '../../HOC/withProvider';
import { AlertType } from '../../Typings/Alert';
import { SopContext } from '../../Context/SopContext';
import { SopCalendar, Sops } from '../../Typings/sops';
import { UserClass } from '../../Typings/User';

type P = {
    children: ReactNode;
    setAlert: (a: AlertType) => void;
    shopId: number;
    user: UserClass;
    changeMonth:Date
}

const SopProvider: FC<P> = ({ children, setAlert, shopId, user , changeMonth }) => {

    const [sops, setSOPS] = useState<Sops[]>();
    const [selectedSop, setSelectedSop] = useState<{ Sops: Sops, taskId: number }>();
    const [sopStatus, setSopStatus] = useState("ALL");
    const [ sopCalendar , setSopCalendar ] = useState<SopCalendar>();
    // console.log("SOP status : ", sopStatus);


    useEffect(() => {
        if (user?.role === 2) {
            getSOPs();
        }
    }, [])

    function getSOPs() {
        getSOP().then((res) => {
            setSOPS(res);
        }).catch((err) => {
            setAlert({ type: 'error', message: err.message })
        })
    }

    function getSopCalendar() {
        getSopByCalendar(shopId).then((res) => {
            setSopCalendar(res.result)
        })
    }
    useEffect(()=>{
        getSopCalendar();
    },[user , shopId , changeMonth])

    function uploadSopImage(blob: string, sopId: number, taskId: number) {
        const file = new File([blob], 'image.jpeg');
        // console.log("File : ",file);

        const formData = new FormData();
        formData.append('image', file);
        uploadImage(formData, sopId, taskId, shopId).then((res) => {
            console.log("Image Uploaded", res);
        })

    }

    return <SopContext.Provider value={{ sops, uploadSopImage, sopCalendar ,  setSelectedSop, selectedSop, sopStatus, setSopStatus }}>
        {children}
    </SopContext.Provider>
}
export default withShop(withUser(withAlert(SopProvider)));