import { FC, useState } from 'react'
import { AiOutlineLineChart, AiOutlineSetting } from 'react-icons/ai'
import { FiEdit, FiChevronRight } from 'react-icons/fi'
import { withUser } from '../../HOC/withUser'
import { UserClass, UserConfig } from '../../Typings/User'
import { IconType } from 'react-icons'
import Hamburger from 'hamburger-react'
import Stores from './Stores'
import Mannager from '../SaleReportUpload/Mannager'
import Ministores from '../Ministores/Ministores'
import { BsShop } from 'react-icons/bs'
import Error from '../Error/404Page'
import { TbBuildingWarehouse } from 'react-icons/tb'


type P = {
  config: UserConfig,
  user: UserClass;
  shopId: number;
  shopConfig:UserConfig
}

const StoreOptions: FC<P> = ({ user, shopId , shopConfig}) => {

  let data = [] as { option: string, logo: IconType }[]

  if (user.role === 1) {
    data = [{ option: "Stores", logo: BsShop },
    { option: "Warehouse", logo: TbBuildingWarehouse },
    { option: "Edit Managers", logo: FiEdit },]
  } else {
    data = [{ option: "Mini Stores", logo: AiOutlineLineChart },
    { option: "SOP", logo: AiOutlineSetting },
    { option: "Inventory", logo: FiEdit },]
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

  if( user.role === 2 && shopConfig.ACCOUNTING.READ === false){
    return <Error message='You are not allowed to see any config' />
  }

  return <div className='relative '>

    <div className=' '>

      <div className='flex items-center max-w-7xl mx-auto'>
        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        <p>{selectedOption}</p>
      </div>

      <div className={'flex flex-col gap-1 px-5 fixed border-r shadow-md   bg-white z-10 h-[100vh] top-0 ' + (isOpen ? " w-[45vh] ml-0 duration-500 " : " -ml-80 duration-500 ")}>

        <div className='flex items-center gap-2 py-2 '>
          <Hamburger size={25} toggled={isOpen} toggle={setOpen} />
          <p className='font-bold'>{selectedOption}</p>
        </div>

        <div className='mt-[50%] p-3'>
          {
            data.map((item) => {
              return <div className=' w-full px-3 border-b-2 border-gray-600 py-3 cursor-pointer flex justify-between  items-center gap-3 ' onClick={() => onSelect(item)} key={item.option} >
                <item.logo size={25} />
                <p className='w-32'>
                  {item.option}
                </p>
                <FiChevronRight size={25} />
              </div>
            })
          }
        </div>
      </div>

    </div>

    {
      selectedOption === 'Stores' ? <Stores /> : selectedOption === "Edit Managers" ? <Mannager /> : selectedOption === "Mini Stores" ? <Ministores to={"/minishops/" + shopId} shopId={shopId} /> : ''
    }

  </div>

}
export default withUser(StoreOptions);