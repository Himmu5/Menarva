import { Button } from '@mui/material';
import { IoAdd } from 'react-icons/io5';
import { FC, useEffect } from 'react'
import ManagerCard from './ManagerCard';
import { Link } from 'react-router-dom';
import { withManager } from '../../HOC/withManager';
import { Manager } from '../../Typings/Manager';

type P = {
    managers: Manager[];
    getSingleManager: (mId: number) => void;
    getManager: () => void;
}

const Mannager: FC<P> = ({ managers, getSingleManager, getManager }) => {
    useEffect(() => {
        getManager();
    }, [])

    return <div className='max-w-5xl mx-auto p-2 '>
        <div className='flex justify-between items-center w-full'>
            <p></p>
            <Link to={'/manager/ADD'} className='text-white flex justify-between text-xs py-4 '>
                <Button startIcon={<IoAdd color="white" />} children="Add Manager" variant='contained' style={{ color: "white" }} />
            </Link>
        </div>
        <div className='flex flex-col gap-3 my-5'>
            {
                managers.map((Manager) => {
                    return <ManagerCard key={Manager.id} getSingleManager={getSingleManager} manager={Manager} index={Manager.id} />
                })
            }
        </div>


    </div>
}
export default withManager(Mannager);