import { FC, ReactNode, useEffect, useState } from 'react'
import { getSOP, uploadImage } from '../../Axios/Sop';
import { withAlert } from '../../HOC/withProvider';
import { AlertType } from '../../Typings/Alert';
import { SopContext } from '../../Context/SopContext';
import { Sops } from '../../Typings/sops';

type P = {
    children: ReactNode;
    setAlert: (a: AlertType) => void;
    shopId: number
}

const SopProvider: FC<P> = ({ children, setAlert, shopId }) => {

    const [sops, setSOPS] = useState<Sops[]>();
    const [selectedSop, setSelectedSop] = useState<{ Sops: Sops, taskId: number }>();
    const [ sopStatus , setSopStatus ] = useState("ALL");
    console.log("SOP status : ",sopStatus);
    

    useEffect(() => {
        getSOPs();
    }, [])

    function getSOPs() {
        getSOP().then((res) => {
            setSOPS(res);
        }).catch((err) => {
            setAlert({ type: 'error', message: err.message })
        })
    }

    function uploadSopImage(blob: string, sopId: number, taskId: number) {
        const file = new File([blob], 'image.jpeg');
        // console.log("File : ",file);
        
        const formData = new FormData();
        formData.append('image', file);
        uploadImage(formData, sopId, taskId, shopId).then((res) => {
            console.log("Image Uploaded",res);
        })

    }

    return <SopContext.Provider value={{ sops, uploadSopImage, setSelectedSop, selectedSop , sopStatus , setSopStatus }}>
        {children}
    </SopContext.Provider>
}
export default withAlert(SopProvider);