import { FC } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { MdInventory } from 'react-icons/md'
import { BsCashStack } from 'react-icons/bs'

type P = {
    isVisible: boolean;
    setVisible: (s: boolean) => void;
}

const Slider: FC<P> = ({ isVisible, setVisible }) => {


    return <div style={{ marginLeft: isVisible ? "0" : "" }} className=" shadow-lg duration-500 absolute bg-sliderColor h-screen w-1/5 rounded-r-xl text-white px-4 flex flex-col -ml-[50%] " >

        <div className='flex items-center justify-between p-4 pt-8'>
            <p></p>
            <RxCross2 onClick={() => setVisible(!isVisible)} size={25} className="cursor-pointer" />
        </div>

        <div>
            <p>ACCOUNT</p>
        </div>


        <div className='self-center my-10 space-y-10'>
            <div className='flex items-center gap-4 '>
                <MdInventory size={25} />
                <p>Inventory</p>
            </div>
            <div className='flex items-center gap-4 '>
                <BsCashStack size={25} />
                <p>Sales</p>
            </div>
        </div>

    </div>
}
export default Slider;