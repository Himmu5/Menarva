import { FC } from 'react'
import { BsCheckCircle } from 'react-icons/bs';
type P = {}
const SalesUploaded: FC<P> = () => {
    return <div className='flex justify-center items-center min-h-screen'> 
        <div className='flex flex-col items-center gap-10'>
            <BsCheckCircle size={150} className={"text-primary"} />
            <p className='font-bold text-2xl'>Bill Submitted Successfully</p>
        </div>
    </div>
}
export default SalesUploaded;