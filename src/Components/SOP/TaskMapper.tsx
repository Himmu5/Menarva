import { FC } from 'react'
import Task from './Task';
import { Sops } from '../../Typings/sops';
import { withSops } from '../../HOC/withProvider';

type P = {
    sops: Sops[];
    sopStatus: "ALL" | "PENDING" | "COMPLETED"
}
const TaskMapper: FC<P> = ({ sops }) => {

    

    return <div className='w-full flex flex-col gap-3 my-3 p-2 text-black'>
        {
            sops.map((option) => {
                return <Task key={option.name} Sops={option} />
            })
        }
    </div>
}
export default withSops(TaskMapper);