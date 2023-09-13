import { FC } from 'react'
import { Logo } from '../../../public/index'

type P = object

const Navbar: FC<P> = () => {
    return <div className='border-b '>
        <img src={Logo} alt='Logo' className='ml-1 mt-3' />
    </div>
}
export default Navbar;