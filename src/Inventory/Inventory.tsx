import {FC, useState} from 'react'
import Slider from './Slider';
import { GiHamburgerMenu } from 'react-icons/gi';

type P = {}

const Inventory:FC<P> =()=>{
    const [ isVisible , setVisible ] = useState(false);

  return <div className='relative'>
      <Slider isVisible={isVisible} setVisible={setVisible}/>
      <div className='text-black cursor-pointer w-fit'   onClick={()=>setVisible(!isVisible)}> <GiHamburgerMenu /> </div>
</div>
}
export default Inventory;