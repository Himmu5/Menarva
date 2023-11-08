import { Button } from '@mui/material';
import { FC } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Manager } from '../../Typings/Manager';
import { withManager } from '../../HOC/withProvider';

type P = {
    index: number;
    manager: Manager;
    getSingleManager: (mId: number) => void
}

const ManagerCard: FC<P> = ({ index, manager, getSingleManager }) => {
    // console.log("manager :",manager);
    return <div key={index} className='w-full border rounded-md  flex flex-col p-2 gap-4 shadow-md'>
        <div className='flex justify-between gap-3 w-full '>
            <img src='https://static.toiimg.com/photo/68944342.cms' className='w-1/3 rounded-md shadow-md' alt='sarukh' />
            <div className='w-2/3 self-start gap-3 flex items-center justify-end'>
                <div className='flex flex-col'>
                    <h1 className='border-b-2 border-gray-500 pl-3 pb-1'>{manager.name}</h1>
                    <p className='self-end text-gray-500 '>MANAGER</p>
                </div>
                <Button variant='contained'  onClick={() => getSingleManager(manager.id)} startIcon={<MdOutlineModeEditOutline size={25} />} children="EDIT" />
            </div>
        </div>
        <p className='flex items-center gap-3 p-2'><span>STORENAME1</span><span className='text-gray-400 '>[Branch Name]</span></p>
    </div>
}
export default withManager(ManagerCard);