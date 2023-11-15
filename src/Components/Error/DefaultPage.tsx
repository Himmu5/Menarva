import { FC } from 'react'
import { BsEmojiSmile } from "react-icons/bs";
import { BsEmojiHeartEyes } from "react-icons/bs";

type P = {}
const DefaultPage: FC<P> = () => {
    return <div className='h-screen flex justify-center items-center  w-full'>
        <div className='flex items-center gap-5'>
            <BsEmojiHeartEyes className=" bg-yellow-500 rounded-full text-white border-none " size={500} />
            <p className=' text-xl sm:text-2xl md:text-3xl flex items-center gap-2 '>Welcome to foodmine<BsEmojiSmile size={20} /></p>
        </div>
    </div>
}
export default DefaultPage;