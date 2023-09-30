import { FC } from 'react'
import { Logo } from '../../../public/index'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { withUser } from '../../HOC/withUser'
import { UserClass } from '../../Typings/User'

type P = {
    removeUser :()=>void ,
    user : UserClass
}

const Navbar: FC<P> = ({ removeUser , user }) => {
    return <div className=' max-w-7xl mx-auto border-b flex justify-between m-2  '>
        <Link to={"/"}><img src={Logo} alt='Logo' className='ml-1 mt-3' /></Link>
        { user && <Button variant='contained' onClick={removeUser} children="Log Out" /> }
    </div>
}
export default withUser(Navbar);