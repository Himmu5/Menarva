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
    setSopTaskStatus: (sopId: string, taskId: number) => void
}

const SubTasks: FC<P> = ({ o, sopStatus, user, setSelectedSop, Sops, setSopTaskStatus }) => {
    let statusComponent = <div></div>

    if (user.role === 1) {
        if (sopStatus == "PENDING") {
            if (o.status === 1) {
                statusComponent = <UploadButton color='red' text='Pending' />
            }
        }
        if (sopStatus == "COMPLETED") {
            if (o.status == 2) {
                statusComponent = <UploadButton color='blue' text='View' />
            }
        }
        if (sopStatus == "ALL") {
            if (o.status == 1) {
                statusComponent = <UploadButton color='red' text='Pending' />
            }
            else if (o.status == 2) {
                statusComponent = <UploadButton color={'blue'} text={"View"} />
            }

        }
    }
    if (user.role === 2) {
        if (sopStatus == "PENDING") {
            // statusComponent = <UploadButton color='red' text='Pending' />
            if (o.imgUrl == null) {
                statusComponent = <Link to={"/camera"} onClick={() => setSelectedSop({ sop: Sops, taskId: +o.id })}> <UploadButton color={'blue'} text={"upload"} /></Link>
            } if (o.imgUrl && o.status === 1) {
                statusComponent = <div onClick={() => setSopTaskStatus(Sops.id, +o.id)}><UploadButton color='blue' text='mark as Done' /></div>
            }
        }
        if (sopStatus == "COMPLETED") {
            statusComponent = <UploadButton color='blue' text='Done' />
        }
        if (sopStatus == "ALL") {
            if (o.imgUrl === null) {
                statusComponent = <Link to={"/camera"} onClick={() => setSelectedSop({ sop: Sops, taskId: +o.id })}> <UploadButton color={'blue'} text={"upload"} /></Link>
            }
            else if (o.imgUrl && o.status === 2) {
                statusComponent = <div><UploadButton color='blue' text='Done' /></div>
            } else if (o.imgUrl) {
                statusComponent = <div onClick={() => setSopTaskStatus(Sops.id, +o.id)}><UploadButton color='blue' text='mark as Done' /></div>
            }
        }
    }

    return <div key={o.name} className='flex items-center justify-between'>
        <p>{o.name}</p>
        {statusComponent}
    </div>
}
export default withSops(SubTasks);