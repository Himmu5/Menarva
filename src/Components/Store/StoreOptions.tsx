import { FC, useState } from 'react'
import { AiOutlineLineChart, AiOutlineSetting } from 'react-icons/ai'
import { FiEdit, FiChevronRight } from 'react-icons/fi'
import { UserClass, UserConfig } from '../../Typings/User'
import { IconType } from 'react-icons'
import Hamburger from 'hamburger-react'
import Stores from './Stores'
import Mannager from '../SaleReportUpload/Mannager'
import Ministores from '../Ministores/Ministores'
import { BsShop } from 'react-icons/bs'
import Error from '../Error/404Page'
import { TbBuildingWarehouse } from 'react-icons/tb'
import Home from '../SOP/Home'
import { withUser } from '../../HOC/withProvider'
import { Drawer } from '@mui/material'
import { RxCross2 } from 'react-icons/rx'
import { MdInventory } from 'react-icons/md'


type P = {
  config: UserConfig,
  user: UserClass;
  shopId: number;
  shopConfig: UserConfig
}


const StoreOptions: FC<P> = ({ user, shopId, shopConfig }) => {
  // console.log("Shop config : ",shopConfig);
  
  let data = [] as { option: string, logo: IconType, show: boolean }[]


  if (user.role === 1) {
    data = [{ option: "Stores", logo: BsShop, show: true },
    { option: "Warehouse", logo: TbBuildingWarehouse, show: false },
    { option: "Edit Managers", logo: FiEdit, show: true },]
  } else {
    data = [{ option: "Mini Stores", logo: AiOutlineLineChart, show: true },
    { option: "SOP", logo: AiOutlineSetting, show: shopConfig?.SOP?.READ },
    { option: "Inventory", logo: FiEdit, show: false }]
  }


  const [isOpen, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(data[0].option);
  function onSelect(item: {
    option: string;
    logo: IconType;
  }) {
    setSelectedOption(item.option);
    setOpen(!open);
  }

  if (user.role == 2 && shopConfig == undefined) {
    return <Error hideButton={true} message='You are not attached to any shops' />
  }
  else if (user.role === 2 && shopConfig.SHOP.READ === false && shopConfig.SOP.READ === false) {
    return <Error message='You are not allowed to see any resource please contact admin' />
  }


  return <div className='relative '>

    <div className=' '>

      <div className='flex items-center max-w-7xl mx-auto'>
        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        <p>{selectedOption}</p>
      </div>

    </div>
    <Drawer transitionDuration={400} onClose={() => setOpen(!open)} anchor="left" PaperProps={{ style: { transition: "width 0.5s", width: '40%', zIndex: 10, backgroundColor: "#313131", color: "white" } }} open={isOpen}>

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
            return item.show && <div className=' w-full px-3 border-b-2 border-gray-600 py-3 cursor-pointer flex justify-between  items-center gap-3 ' onClick={() => onSelect(item)} key={item.option} >
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

    {
      selectedOption === 'Stores' ? <Stores /> : selectedOption === "Edit Managers" ? <Mannager /> : selectedOption === "Mini Stores" ? <Ministores to={"/minishops/" + shopId} shopId={shopId} /> : selectedOption === "SOP" ? <Home /> : ""
    }

  </div>

}
export default withUser(StoreOptions);