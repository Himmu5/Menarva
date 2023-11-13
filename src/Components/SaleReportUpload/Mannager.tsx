import { Button } from '@mui/material';
import { IoAdd } from 'react-icons/io5';
import { FC, useEffect } from 'react'
import ManagerCard from './ManagerCard';
import { Link, useNavigate } from 'react-router-dom';
// import { Manager } from '../../Typings/Manager';
import { withManager } from '../../HOC/withProvider';
import { UserClass } from '../../Typings/User';
import BackButton from '../UI-Components/BackButton';

type P = {
    managers: { user: UserClass }[];
    getSingleManager: (mId: number) => void;
    getManager: () => void;
}

const Mannager: FC<P> = ({ managers, getSingleManager, getManager }) => {
    useEffect(() => {
        getManager();
    }, [])
    const Navigate = useNavigate();

    return <div className='max-w-5xl mx-auto p-2 '>
        <div onClick={()=>Navigate(-1)} className='w-fit'><BackButton  /></div>
        <div className='flex justify-between items-center w-full'>
            <p></p>
            <Link to={'/manager/ADD'} className='text-white flex justify-between text-xs py-4 '>
                <Button startIcon={<IoAdd color="white" />} children="Add Manager" variant='contained' style={{ color: "white" }} />
            </Link>
        </div>
        <div className='flex flex-col gap-3 my-5'>
            {
                managers.map((Manager) => {
                    return <ManagerCard key={Math.random()} getSingleManager={getSingleManager} manager={Manager.user} index={Manager.user.id} />
                })
            }
        </div>


    </div>
}
export default withManager(Mannager);