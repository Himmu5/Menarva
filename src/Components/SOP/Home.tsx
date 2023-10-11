import { FC } from 'react'
// import { RxHamburgerMenu } from 'react-icons/rx'
import TaskMapper from './TaskMapper'
import { withSops } from '../../HOC/withProvider'
import { Sops } from '../../Typings/sops'
import SelectionOption from '../UI-Components/SelectionOption'

type P = {
    sops:Sops[]
}

const Home: FC<P> = ({ sops }) => {

    return <div className='max-w-7xl mx-auto flex flex-col'>

        {/* <div className=' flex items-center gap-2 p-3 py-5'>
            <RxHamburgerMenu size={20} />
            <p>Task List</p>
        </div> */}
{/* 
        <div className='w-full flex items-center justify-around border-b-2 border-gray-400 '>
            <p>ALL</p>
            <p className='text-red-500'>PENDING</p>
            <p className='text-green-500 '>COMPLETED</p>
        </div> */}
        
        <SelectionOption list={['ALL', 'PENDING', 'COMPLETED']} />
        <TaskMapper sops={sops} />

    </div>
}
export default withSops(Home);