import { Button } from '@mui/material';
import { FC } from 'react'
import { FiUpload } from 'react-icons/fi';
import { RxCrossCircled } from 'react-icons/rx';
import { BsCartDash } from 'react-icons/bs';
import CustomInput from './CustomInput';
import { IoMdPricetags } from 'react-icons/io';
import { BiBookAdd } from 'react-icons/bi';

type P = {}

const AddEditItemForm: FC<P> = () => {

    return <form className='bg-primary rounded-t-2xl shadow-xl p-5 text-white  flex flex-col gap-4' action="" >
        <div className='flex justify-between items-center '>
            <h1 className='text-lg'>ADD/EDIT ITEM Bill</h1>
            <RxCrossCircled size={25} />
        </div>
        <CustomInput Icon={FiUpload} placeholder='Item Name' type='text' />
        <CustomInput Icon={BsCartDash} type="number" placeholder='Quantity' />
        <CustomInput Icon={IoMdPricetags} placeholder='Item price' type='text' />
        <CustomInput Icon={BiBookAdd} placeholder='Add on (Optional)' type='text' />

        <Button variant="outlined" style={{ borderColor: 'white', color: 'white', textAlign: 'left', width: "40%", alignSelf: "center", borderRadius: 100 }} children="submit" />
    </form>
}
export default AddEditItemForm;