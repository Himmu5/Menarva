import { FC } from 'react'
import Input from '../UI-Components/Input';
import { BsFillPersonFill } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'

type P = object

const AddEditManager: FC<P> = () => {
    return <div className='min-h-[80vh] flex justify-center items-center '>

        <div>
            <h1 className='text-center'>ADD MANAGER</h1>

            <form action="" className='flex flex-col gap-3'>
                <div className='flex items-center relative'>
                    <BsFillPersonFill size={20} className="absolute left-2 " />
                    <Input type='' placeholder='Manager Name' />
                </div>
                <div className='flex items-center relative'>
                    <MdOutlineEmail size={20} className="absolute left-2 " />
                    <Input type='' placeholder='Email Address' />
                </div>
                <div className='flex items-center relative'>
                    <BiSolidLock size={20} className="absolute left-2 " />
                    <Input type='' placeholder='Password' />
                </div>

                <select name="" id="" className='px-'>
                    <option className='flex items-center relative' >
                        <BsFillPersonFill size={20} className="absolute left-2 " />
                        <p className='px-10'>Manager Type</p>
                    </option>
                </select>
            </form>

        </div>

    </div>
}
export default AddEditManager;