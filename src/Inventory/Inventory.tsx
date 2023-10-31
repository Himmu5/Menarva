import { FC, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsFillBellFill, BsFillCalendarFill } from 'react-icons/bs';
import Slider from './Slider';
import ItemList from './ItemList';

type P = {}

const Inventory: FC<P> = () => {

    const [isVisible, setVisible] = useState(false);

    return <div className='relative '>
        <Slider isVisible={isVisible} setVisible={setVisible} />

        <div className='flex items-center justify-between px-4 '>
            {isVisible === false ? <div className='text-black cursor-pointer w-fit' onClick={() => setVisible(!isVisible)}> <GiHamburgerMenu className="cursor-pointer " size={20} /> </div> : <div></div>}
            <p className='font-bold'>Sales</p>
            <div className='flex gap-2 items-center text-primary '>
                <BsFillBellFill size={20} />
                <BsFillCalendarFill size={20} />
                <p className='text-black'>17, Aug</p>
            </div>
        </div>

        <ItemList />


    </div>
}
export default Inventory;