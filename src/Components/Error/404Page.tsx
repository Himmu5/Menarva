import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

type P = {
    message?: string;
}
const Error: FC<P> = ({ message }) => {
    const Navigate = useNavigate();

    return <div className='h-[80vh] w-full flex justify-center items-center text-center text-sm'>
        <div className='flex flex-col items-center '>
            <div className=' font-bold text-xl '>
                {message}
            </div>
            <div className='w-fit px-3  text-white '  onClick={() => Navigate(-1)}><Button variant='contained' children="back" /></div>
        </div>
    </div>
}
export default Error;