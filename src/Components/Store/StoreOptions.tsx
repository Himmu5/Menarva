import { FC, useState } from 'react'
import { AiOutlineLineChart, AiOutlineSetting } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { withUser } from '../../HOC/withUser'
import { UserClass, UserConfig } from '../../Typings/User'
import { IconType } from 'react-icons'
import Hamburger from 'hamburger-react'
import Stores from './Stores'
import Mannager from '../SaleReportUpload/Mannager'
import Ministores from '../Ministores/Ministores'

type P = {
  config: UserConfig,
  user: UserClass;
  shopId: number
}

const StoreOptions: FC<P> = ({ user, shopId }) => {

  let data = [] as { option: string, logo: IconType }[]

  if (user.role === 1) {
    data = [{ option: "Stores", logo: AiOutlineLineChart },
    { option: "Warehouse", logo: AiOutlineSetting },
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



  return <>

    <div className='max-w-7xl mx-auto relative bg-white '>
      <div className='flex items-center'>
        <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        <p>{selectedOption}</p>
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
      selectedOption === 'Stores' ? <Stores /> : selectedOption === "Edit Managers" ? <Mannager /> : selectedOption === "Mini Stores" ? <Ministores to={"/minishops/" + shopId} shopId={shopId} /> : ''
    }

  </>

}
export default withUser(StoreOptions);