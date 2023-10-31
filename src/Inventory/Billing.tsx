import { FC } from 'react'
import { BillingImage } from '../../public';
import { BsFillBellFill, BsFillCalendarFill } from 'react-icons/bs';
import UploadBill from './UploadBill';
import AddEditItemForm from './AddEditItemForm';

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

        {/* <UploadBill /> */}
        <AddEditItemForm />
    </div>
}
export default Billing;