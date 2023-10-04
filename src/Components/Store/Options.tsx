import { FC, useState } from 'react'
import { AiOutlineLineChart, AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { withShop } from '../../HOC/withShop'
import { Shop } from '../../Typings/Shop'
import Hamburger from 'hamburger-react'
import Ministores from '../Ministores/Ministores'
import { Home } from '@mui/icons-material'

type P = {
    selectedShop: Shop
}
const Options: FC<P> = ({ selectedShop }) => {
    console.log("Selected Shop : ", selectedShop);
    const op = [
        "Mini Stores",
        "Inventory",
        "SOP"
    ]
    const [selectedOption, setSelectedOption] = useState(op[0]);

    const [isOpen, setOpen] = useState(false)
    function onSelect(item: string) {
        setSelectedOption(item  );
        setOpen(!open);
    }


    return <>
        <div className='max-w-7xl mx-auto relative bg-white '>
            <div className='flex items-center'>
                <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
                <p>{selectedOption}</p>
            </div>


            <div className='flex flex-col gap-1 absolute left-12  '>
                {
                    isOpen && op.map((item) => {
                        return <div className=' cursor-pointer  ' onClick={() => onSelect(item)} key={item} >
                            {item}
                        </div>
                    })
                }
            </div>

        </div>


        {
            selectedOption === "Mini Stores" ? <Ministores /> : selectedOption === "SOP" && <Home />
        }
        
    </>

}
export default withShop(Options);