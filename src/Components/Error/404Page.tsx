import { FC } from 'react'
type P = {
    message?: string;
}
const Error: FC<P> = ({ message }) => {

    return <div className='h-[80vh] w-full flex justify-center items-center text-center text-sm'>
        <div className=' font-bold text-xl '>
            {message}
        </div>
    </div>
}
export default Error;