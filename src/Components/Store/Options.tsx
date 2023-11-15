import { FC, useEffect, useState } from 'react'
import Hamburger from 'hamburger-react'
import Ministores from '../Ministores/Ministores'
import { Home } from '@mui/icons-material'
import { FiChevronRight } from 'react-icons/fi'
import { BiStore } from 'react-icons/bi'
import { MdOutlineInventory } from 'react-icons/md'
import { IoIosOptions } from 'react-icons/io'
import { Shop } from '../../Typings/Shop'
import { IconType } from 'react-icons'
import { withShop, withUser } from '../../HOC/withProvider'
import { UserClass } from '../../Typings/User'
import Calendar from './Calendar'
import { Drawer } from '@mui/material'
import { RxCross2 } from 'react-icons/rx'

type P = {
    selectedShop: Shop;
    user: UserClass;
    getMonthSale: () => void;
}

const Options: FC<P> = ({ user, getMonthSale }) => {
    const data = [
        { option: "Mini Stores", logo: BiStore },
        {
            option: "Inventory", logo: MdOutlineInventory
        },
        { option: "SOP", logo: IoIosOptions }
    ]
    const [selectedOption, setSelectedOption] = useState(data[0]);

    const [isOpen, setOpen] = useState(false)
    function onSelect(item: {
        option: string;
        logo: IconType;
    }) {
        setSelectedOption(item);
        setOpen(!open);
    }

    useEffect(() => {
        getMonthSale();
    }, [])

    return <>
        <div className=' relative bg-white z-40'>
            <div className=' '>

                <div className='flex items-center max-w-7xl mx-auto'>
                    <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
                    <p>{selectedOption.option}</p>
                </div>

                <Drawer transitionDuration={400} onClose={() => setOpen(!open)} anchor="left" PaperProps={{ style: { transition: "width 0.5s", width: '35%', zIndex: 10, backgroundColor: "#313131", color: "white" } }} open={isOpen}>

                    <div className='flex items-center justify-between p-4 pt-8'>
                        <p></p>
                        <RxCross2 onClick={() => setOpen(!isOpen)} size={25} className="cursor-pointer" />
                    </div>

                    <div className='px-4'>
                        <p>ACCOUNT</p>
                    </div>


                    <div className='mt-[40%] p-3'>
                        {
                            data.map((item) => {
                                return <div  className=' w-full px-3 border-b-2 border-gray-600 py-3 cursor-pointer flex justify-between  items-center gap-3 ' onClick={() => onSelect(item)} key={item.option} >
                                    <item.logo size={25} />
                                    <p className='w-32'>
                                        {item.option}
                                    </p>
                                    <FiChevronRight size={25} />
                                </div>
                            })
                        }
                    </div>

                </Drawer >

            </div>


            <div className='flex flex-col gap-1 absolute left-12  '>
                {
                    isOpen && data.map((item) => {
                        return <div className=' cursor-pointer  ' onClick={() => onSelect(item)} key={item.option} >
                            {item.option}
                        </div>
                    })
                }
            </div>

        </div>


        {
            selectedOption.option === "Mini Stores" ? <Ministores /> : (selectedOption.option === "SOP" && user.role === 2) ? <Home /> : ((selectedOption.option === "SOP" && user.role === 1) ? <Calendar Sales={true} /> : <div></div>)
        }

    </>

}
export default withUser(withShop(Options));