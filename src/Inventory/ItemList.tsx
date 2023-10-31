import { Button } from '@mui/material';
import { FC } from 'react'
import { BsPencilFill } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

type P = {}
const ItemList: FC<P> = () => {
    return <div className='bg-primary rounded-t-xl shadow-xl'>

        <div className='flex items-center justify-between px-4 py-5'>
            <p></p>

            <Button children="Add Items" variant='outlined' size='small' style={{ borderColor: 'white', color: 'white', textAlign: 'left', alignSelf: "center", borderRadius: 50 }} />
        </div>

        <div className='flex flex-col'>

            <div className='flex items-center px-4 text-center font-bold text-sm border-white border text-white '>
                <p className='w-1/4 p-2 border-r '>ITEM</p>
                <p className='w-1/4 p-2 border-r '>QUANTITY</p>
                <p className='w-1/4 p-2 border-r'>PRICE</p>
                <p className='w-1/4 p-2'></p>
            </div>

            <div className='text-black font-bold text-sm '>
                {
                    [...Array(20).keys()].map((item, index) => <div key={index} className='flex items-center px-4 text-center border-white border  '>
                        <p className='w-1/4 p-2 border-r '>ITEM{item + 1}</p>
                        <p className='w-1/4 p-2 border-r '>QQ</p>
                        <p className='w-1/4 p-2 border-r'>$$</p>
                        <div className='w-1/4 flex items-center gap-3 justify-between px-5'> <BsPencilFill size={28} className="rounded-md p-2 bg-white text-blue-500 " /> <RiDeleteBin6Line size={28} className="rounded-md p-2 bg-white text-red-500" /></div>
                    </div>)
                }
            </div>

            <Button children="Submit Bill" variant='outlined' sx={{ marginY : 2 }} style={{ borderColor: 'white', color: 'white', textAlign: 'left', alignSelf: "center", borderRadius: 50 }} />

        </div>

    </div>
}
export default ItemList;