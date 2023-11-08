import { FC, useState } from 'react'
import { Logo } from '../../../public/index'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { UserClass } from '../../Typings/User'
import { withUser } from '../../HOC/withProvider'
import Dialog from '@mui/material/Dialog';
type P = {
    removeUser: () => void,
    user: UserClass
}

const Navbar: FC<P> = ({ removeUser, user }) => {
    const [open , setOpen] = useState(false);

    function toggle (){
        setOpen(!open);
    }

    return <><div className=' px-3 py-1 max-w-7xl mx-auto border-b flex justify-between m-2  '>
        <Link to={"/"}><img src={Logo} alt='Logo' className='ml-1 mt-3' /></Link>
        {user && <Button variant='contained' size='small' onClick={removeUser} children="Log Out " sx={{ backgroundColor: "red" }} />}
    </div>
    <Dialog open={open}  onClose={toggle}>
            Hello
    </Dialog>
    </>
}
export default withUser(Navbar);