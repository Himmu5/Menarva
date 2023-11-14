import { FC } from 'react'
type P = {}
const DefaultPage: FC<P> = () => {
    return <div className='h-screen flex justify-center items-center  w-full'>
        <p className='text-2xl '>Welcome to foodmine</p>
    </div>
}
export default DefaultPage;