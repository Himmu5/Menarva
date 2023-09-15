import { FC } from 'react'
import Task from './Task';

type P = {
    dummyOptions: {
        Heading: string;
        options: string[];
    }[]
}
const TaskMapper: FC<P> = ({ dummyOptions }) => {



    return <div className='w-full flex flex-col gap-3 my-3 p-2 text-black'>
        {
            dummyOptions.map((option) => {
                return <Task key={option.Heading} option={option} />
            })
        }
    </div>
}
export default TaskMapper;