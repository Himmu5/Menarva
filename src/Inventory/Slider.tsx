import { FC } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { MdInventory } from 'react-icons/md'
import { BsCashStack } from 'react-icons/bs'
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom'

type P = {
    isVisible: boolean;
    setVisible: (s: boolean) => void;
}

const Slider: FC<P> = ({ isVisible, setVisible }) => {
    // Add an event listener to close the slider on outclick

    function handleClose() {
        setVisible(!isVisible);
    }

    return <Drawer onClose={handleClose} anchor="left" className='w-1/5' PaperProps={{ style: { width: '45%', zIndex: 10, backgroundColor: "#313131", color: "white" } }} open={isVisible}>

        <div className='flex items-center justify-between p-4 pt-8'>
            <p></p>
            <RxCross2 onClick={() => setVisible(!isVisible)} size={25} className="cursor-pointer" />
        </div>

        <div className='px-4'>
            <p>ACCOUNT</p>
        </div>


        <div className='self-center my-10 space-y-10' >
            <div className='flex items-center gap-4 '>
                <MdInventory size={25} />
                <p>Inventory</p>
            </div>
            <Link to={"/billing"} className='flex items-center gap-4 '>
                <BsCashStack size={25} />
                <p className=' font-bold '>Sales</p>
            </Link>
        </div>

    </Drawer >
}
export default Slider;