import { FC } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { dummyOptions } from '../../Data/dummy'
import { BsFillCaretDownFill } from 'react-icons/bs'

type P = object

const Home: FC<P> = () => {
    return <div className='max-w-7xl mx-auto flex flex-col'>

        <div className=' flex items-center gap-2 p-3 py-5'>
            <RxHamburgerMenu size={20} />
            <p>Task List</p>
        </div>

        <div className='w-full flex items-center justify-around border-b-2 border-gray-400 pb-3'>
            <p>ALL</p>
            <p className='text-red-500'>PENDING</p>
            <p className='text-green-500 '>COMPLETED</p>
        </div>

        <div className='w-full flex flex-col gap-3 my-3 p-2 text-black'>
            {
                dummyOptions.map((option)=>{
                    return <div className='flex items-center p-3 justify-between w-full border rounded-xl'>
                        <p>{option}</p>
                        <BsFillCaretDownFill size={20}/>
                    </div>
                })
            }
        </div>


    </div>
}
export default Home;