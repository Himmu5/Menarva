import { FC } from 'react'
import { BillingImage } from '../../public';
import { FiUpload } from 'react-icons/fi';
import Input from '../Components/UI-Components/Input';
import { RxCrossCircled } from 'react-icons/rx';
import { Button } from '@mui/material';
import { BsFillBellFill, BsFillCalendarFill } from 'react-icons/bs';

type P = {}
const Billing: FC<P> = () => {

    return <div className='flex flex-col'>

        <div className='flex justify-between items-center px-4 py-2'>
            <p></p>
            <p className='font-bold'>Sales</p>
            <div className='flex gap-2 items-center text-primary '>
                <BsFillBellFill size={20} />
                <BsFillCalendarFill size={20} />
                <p className='text-black'>17, Aug</p>
            </div>
        </div>


        <div className='p-3 flex flex-col'>
            <img src={BillingImage} alt="" />
        </div>

        <form className='bg-primary rounded-t-2xl shadow-xl p-5 text-white  flex flex-col gap-4' action="" >
            <div className='flex justify-between items-center '>
                <h1 className='text-lg'>Upload Bill</h1>
                <RxCrossCircled size={25} />
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-2  relative  '>
                    <FiUpload size={20} className="absolute left-2" />
                    <Input type="text" placeholder='Upload' className=' w-full placeholder:text-white text-white border border-gray-200 bg-transparent' name="bill" id="bill" />
                </div>
                <p className='text-xs text-gray-300 self-start mt-1 '>You can upload a of csv or xlsx file*</p>
            </div>

            <div className='flex items-center '>
                <p className=' border-2 border-white w-full'></p>
                <p className='text-lg p-2'>OR</p>
                <p className=' border-2 border-white w-full'></p>
            </div>
            <Button variant="outlined" style={{ borderColor: 'white', color: 'white', textAlign: 'left' }} className='bg-white w-full text-primary text-start ' startIcon={<FiUpload />} >Add Items</Button>
            <Button variant="outlined" style={{ borderColor: 'white', color: 'white', textAlign: 'left' , width : "40%", alignSelf : "center" , borderRadius : 100 }}  children="submit" />
        </form>

    </div>
}
export default Billing;