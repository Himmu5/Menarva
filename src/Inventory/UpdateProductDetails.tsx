import { FC } from 'react'
import { UpdateProduct } from '../../public';
import CustomInput from './CustomInput';
import { MdOutlineCategory } from 'react-icons/md';
import { BsBag, BsCartPlus } from 'react-icons/bs';
import { FaLinode } from 'react-icons/fa';
import { IoMdPricetags } from 'react-icons/io';
import Button from '@mui/material/Button';

type P = {}

const UpdateProductDetails: FC<P> = () => {
    return <form className='flex flex-col bg-primary p-6 rounded-t-xl text-white '>
        <h1 className='font-bold text-xl '>Update Product Details</h1>
        <img src={UpdateProduct} alt="form Image" className='p-6' />
        <div className='space-y-3'>
            <CustomInput Icon={MdOutlineCategory} placeholder='Select Category' type='text' />
            <CustomInput Icon={BsBag} placeholder='Select Item' type='text' />
            <CustomInput Icon={FaLinode} placeholder='Current Quantity' type='number' />
            <CustomInput Icon={BsCartPlus} placeholder='Added Quantity' type='number' />
            <CustomInput Icon={IoMdPricetags} placeholder='Update price' type='text' />
        </div>

        <Button children="Update Stock" variant='outlined' sx={{ color: "white", borderColor: "white" , marginTop : 3, borderRadius:5 }} className='w-fit self-center' />

    </form>
}
export default UpdateProductDetails;