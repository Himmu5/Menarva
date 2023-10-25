import { FC, useState } from 'react'
import Webcam from "react-webcam";
import { RxCross1 } from 'react-icons/rx'
import { BsCircle } from 'react-icons/bs'
import { FaUndo } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
// import { saveAs } from 'file-saver';
import React from 'react';
import { withSops } from '../../HOC/withProvider';
import { Sops } from '../../Typings/sops';
import { MdOutlineFlipCameraIos } from 'react-icons/md'

type P = {
    uploadSopImage: (blob: Blob, sopId: string, taskId: number) => void;
    selectedSop: { sop: Sops, taskId: number };
    Navigate: (i: string) => void
}

const Camera: FC<P> = ({ uploadSopImage, selectedSop, Navigate }) => {
    const webcamRef = React.createRef<Webcam>();
    const [picture, setPicture] = useState<string>();
    const [facingMode, setFacingMode] = useState("user");

    console.log("dataURItoBlob ", picture && dataURItoBlob(picture!));

    function dataURItoBlob(dataURI: string) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }


    const capture = () => {
        const screenshot = webcamRef.current!.getScreenshot();
        setPicture(screenshot!);
    };

    const file = new File([picture!], 'image.jpg');

    console.log("URL.createObjectURL(file) ", URL.createObjectURL(file));

    const downloadPicture = () => {
        console.log("Uploading picture");

        uploadSopImage(dataURItoBlob(picture!), selectedSop?.sop.id, selectedSop?.taskId);
        // saveAs(picture! , 'myPicture.jpg'
    }

    const handleClose = () => {
        setPicture(undefined);
        Navigate("/Sop");
    }
    return <div className='min-h-[80vh] m-4'>
        {/* <input type="file" onChange={(e)=>setPicture(e.target.value)} /> */}
        {/* <img src={dataURItoBlob(picture!)}  alt="New Formated Image"/> */}

        {
            picture ? <div className='relative  max-w-3xl mx-auto'>
                <img src={picture} alt='picture' />
                <div className=' absolute gap-4 justify-center  font-bold bottom-0 flex w-full my-2 '>
                    <div onClick={() => setPicture(undefined)} className=' cursor-pointer flex bg-white opacity-40 w-1/6 p-4 items-center flex-col gap-2'>
                        <FaUndo size={25} />
                        <p>Retake</p>
                    </div>
                    <div onClick={downloadPicture} className=' cursor-pointer flex bg-white opacity-40 w-1/6 p-4 items-center flex-col gap-2'>
                        <FiUpload size={25} />
                        <p>Upload</p>
                    </div>
                </div>
            </div> : <div className='h-full w-full max-w-3xl mx-auto'>
                <Webcam className=' w-full max-h-[80vh] ' audio={false}
                    ref={webcamRef}
                    videoConstraints={{ facingMode }}
                    screenshotFormat="image/jpeg" />
                <div className='p-4 bg-black h-full flex justify-between items-center text-white  ' >
                    <RxCross1 size={35} className=" hover:scale-95 cursor-pointer " onClick={handleClose} />
                    <BsCircle size={40} className=" hover:scale-95 cursor-pointer " onClick={capture} />
                    <div onClick={() => setFacingMode(facingMode === "user" ? "environment" : "user")} > <MdOutlineFlipCameraIos size={35} /> </div>
            </div>
            </div>
}


    </div >
}
export default withSops(Camera);