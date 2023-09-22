import { FC } from 'react'
import { Logo } from '../../../public/index'
import { Link } from 'react-router-dom'

type P = object

const Navbar: FC<P> = () => {
    return <div className=' max-w-7xl mx-auto border-b flex  '>
        <Link to={"/"}><img src={Logo} alt='Logo' className='ml-1 mt-3' /></Link>
    </div>
}
export default Navbar;