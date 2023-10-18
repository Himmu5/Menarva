import { FC } from 'react'
type P = {
    status: number;
    message:string
}
const ApprovalStatus: FC<P> = ({ status , message }) => {

    let extraClass = " ";
    if (status === 1) {
        extraClass = " text-green-400 border-green-400 "
    }
    else if(status === 2){
        extraClass = " text-yellow-400  border-yellow-400 "
    }else{
        extraClass = " text-red-400  border-red-400 "
    }

    return <div className='text-sm items-center gap-1 flex self-start text-left '>
        <p className='font-bold min-w-[35vh] '>{message} : </p> <p className={' px-2 py-1 rounded-md shadow-md border-2 '+extraClass}> {status === 1 ? " Accepted " : status === 2 ? " Pending " : status === 3 && " Rejected"} </p>
    </div>
}
export default ApprovalStatus;