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

type P = {
    uploadSopImage: (blob: string, sopId: string, taskId: number) => void;
    selectedSop : { sop: Sops , taskId : number }
}

const Camera: FC<P> = ({ uploadSopImage , selectedSop}) => {
    const webcamRef = React.createRef<Webcam>();
    const [picture, setPicture] = useState<string>();
    console.log("Picture ,", picture);
    const capture = () => {
        const screenshot = webcamRef.current!.getScreenshot();
        setPicture(screenshot!);
    };
    console.log("pictire ",picture);

    const downloadPicture = ()=>{
        uploadSopImage(picture! , selectedSop.sop.id , selectedSop.taskId );
        // saveAs(picture! , 'myPicture.jpg')
    }
    return <div className='min-h-[80vh] m-4'>
        {
            picture ? <div className='relative  max-w-3xl mx-auto'>
                <img src={picture} alt='picture' />
                <div className=' absolute gap-4 justify-center  font-bold bottom-0 flex w-full my-2 '>
                    <div onClick={()=>setPicture(undefined)} className=' cursor-pointer flex bg-white opacity-40 w-1/6 p-4 items-center flex-col gap-2'>
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
                    screenshotFormat="image/jpeg" />
                <div className='p-4 bg-black h-full flex justify-between items-center text-white  ' >
                    <RxCross1 size={35} className=" hover:scale-95 cursor-pointer " />
                    <BsCircle size={40} className=" hover:scale-95 cursor-pointer " onClick={capture} />
                    <div></div>
                </div>
            </div>
        }


    </div>
}
export default withSops(Camera);