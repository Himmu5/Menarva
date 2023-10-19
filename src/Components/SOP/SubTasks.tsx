import { FC, useState } from 'react'
import { Sops, Task } from '../../Typings/sops'
import UploadButton from '../UI-Components/UploadButton'
import { UserClass, UserConfig } from '../../Typings/User';
import { Link } from 'react-router-dom';
import { withSops } from '../../HOC/withProvider';
import ImageViwer from '../UI-Components/ImageViwer';
import { withUser } from '../../HOC/withUser';
type P = {
    sopStatus: string,
    o: Task;
    user: UserClass;
    Sops: Sops;
    setSelectedSop: (s: { sop: Sops; taskId: number; }) => void;
    setSopTaskStatus: (sopId: string, taskId: number) => void;
    shopConfig:UserConfig
}

const SubTasks: FC<P> = ({ o, sopStatus, user, setSelectedSop, Sops, setSopTaskStatus , shopConfig }) => {
    console.log("shopConfig",shopConfig);
    
    const [ open , setOpen] = useState(false);
    let statusComponent = <div></div>

    if (user.role === 1) {
        if (sopStatus == "PENDING") {
            if (o.status === 1) {
                statusComponent = <UploadButton color='red' text='Pending' />
            }
        }
        if (sopStatus == "COMPLETED") {
            if (o.status == 2) {
                statusComponent = <div onClick={()=>setOpen(!open)}> <UploadButton color={'blue'} text={"View"} /></div>
            }
        }
        if (sopStatus == "ALL") {
            if (o.status == 1) {
                statusComponent = <UploadButton color='red' text='Pending' />
            }
            else if (o.status == 2) {
                statusComponent =<div onClick={()=>setOpen(!open)}> <UploadButton color={'blue'} text={"View"} /></div>
            }

        }
    }
    if (user.role === 2) {
        if (sopStatus == "PENDING") {
            // statusComponent = <UploadButton color='red' text='Pending' />
            if (o.imgUrl == null) {
                statusComponent = shopConfig.SOP.IMAGE_UPLOAD? <Link to={"/camera"} onClick={() => setSelectedSop({ sop: Sops, taskId: +o.id })}> <UploadButton color={'blue'} text={"upload"} /></Link> : <UploadButton color={'red'} text={"unauthorized"} />
            } if (o.imgUrl && o.status === 1) {
                statusComponent = <div onClick={() => setSopTaskStatus(Sops.id, +o.id)}><UploadButton color='blue' text='mark as Done' /></div>
            }
        }
        if (sopStatus == "COMPLETED") {
            statusComponent = <UploadButton color='blue' text='Done' />
        }
        if (sopStatus == "ALL") {
            if (o.imgUrl === null) {
                statusComponent = shopConfig.SOP.IMAGE_UPLOAD ? <Link to={"/camera"} onClick={() => setSelectedSop({ sop: Sops, taskId: +o.id })}> <UploadButton color={'blue'} text={"upload"} /></Link> : <UploadButton color={'red'} text={"unauthorized"} />
            }
            else if (o.imgUrl && o.status === 2) {
                statusComponent = <div><UploadButton color='blue' text='Done' /></div>
            } else if (o.imgUrl) {
                statusComponent = <div onClick={() => setSopTaskStatus(Sops.id, +o.id)}><UploadButton color='blue' text='mark as Done' /></div>
            }
        }
    }

    return <>
         <ImageViwer imageUrl={o.imgUrl!} open={open} setOpen={setOpen} />
        <div key={o.name} className='flex items-center justify-between'>
            <p>{o.name}</p>
            {statusComponent}
        </div>
    </>
}
export default withSops(withUser(SubTasks));