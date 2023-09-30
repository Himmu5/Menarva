import { Button } from '@mui/material';
import { IoAdd } from 'react-icons/io5';
import { FC } from 'react'
import ManagerCard from './ManagerCard';
import { Link } from 'react-router-dom';
import { withManager } from '../../HOC/withManager';
import { Manager } from '../../Typings/Manager';

type P = {
    managers : Manager[]
}

const Mannager: FC<P> = ({ managers }) => {
    
    return <div className='max-w-5xl mx-auto p-2 '>
        <Link to={'/mannager/edit'} className='text-white w-full flex justify-between text-xs py-4 '>
            <p></p>
            <Button startIcon={<IoAdd color="white" />} children="Add Manager" variant='contained' style={{ color: "white" }} />
        </Link>
        <div className='flex flex-col gap-3 my-5'>
            {
                managers.map((Manager) => {
                    return <ManagerCard manager={Manager} index={Manager.id} />
                })
            }
        </div>


    </div>
}
export default withManager(Mannager);