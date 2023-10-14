import { FC } from 'react'
import { Sops, Task } from '../../Typings/sops'
import UploadButton from '../UI-Components/UploadButton'
import { UserClass } from '../../Typings/User';
import { Link } from 'react-router-dom';
import { withSops } from '../../HOC/withProvider';
type P = {
    sopStatus: string,
    o: Task;
    user: UserClass;
    Sops: Sops;
    setSelectedSop: (s: { sop: Sops; taskId: number; }) => void;
    setSopTaskStatus:(sopId : string , taskId : number)=>void
}

const SubTasks: FC<P> = ({ o, sopStatus, user, setSelectedSop, Sops , setSopTaskStatus }) => {
    let statusComponent = <div></div>

    if (user.role === 1) {
        if (sopStatus == "PENDING" && o.imgUrl === null) {
            statusComponent = <UploadButton color='red' text='unavailable' />
        }
        if (sopStatus == "COMPLETED") {
            statusComponent = <UploadButton color='blue' text='Mark as done' />
        }
        if (sopStatus == "ALL") {
            statusComponent = <UploadButton color={o.status == 1 ? 'red' : 'blue'} text={o.imgUrl ? "View" : o.status == 1 ? "Pending" : 'Mark as done'} />
        }
    }
    if (user.role === 2) {
        if (sopStatus == "PENDING" && o.imgUrl === null) {
            statusComponent = <UploadButton color='red' text='Pending' />
        }
        if (sopStatus == "PENDING" && o.imgUrl !== null) {
            statusComponent = <UploadButton color='red' text='Pending' />
        }
        if (sopStatus == "COMPLETED") {
            statusComponent = <UploadButton color='blue' text='done' />
        }
        if (sopStatus == "ALL") {
            if (o.imgUrl === null) {
                statusComponent = <Link to={"/camera"} onClick={() => setSelectedSop({ sop: Sops, taskId: +o.id })}> <UploadButton color={'blue'} text={o.imgUrl ? "View" : o.status == 1 ? "upload" : 'Mark as done'} /></Link>
            }
            else {
                statusComponent = <div onClick={() => setSopTaskStatus(Sops.id, +o.id)}><UploadButton color='blue' text='Mark as done' /></div>
            }
        }
    }

    // if(sopStatus === "COMPLETED"){
    //     return 
    // }
    return <div key={o.name} className='flex items-center justify-between'>
        <p>{o.name}</p>
        {statusComponent}
    </div>
}
export default withSops(SubTasks);