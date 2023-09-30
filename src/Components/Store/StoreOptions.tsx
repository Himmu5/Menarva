import { FC } from 'react'
import { AiOutlineRight, AiOutlineLineChart, AiOutlineSetting } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { withUser } from '../../HOC/withUser'
import { UserClass, UserConfig } from '../../Typings/User'
import { IconType } from 'react-icons'

type P = {
  config: UserConfig,
  user: UserClass;
  shopId : number
}

const StoreOptions: FC<P> = ({ config, user , shopId}) => {

  console.log("user  :", user);

  let data = [] as { option : string , logo : IconType }[]

  if (user.role === 1) {
    data = [{ option: "Stores", logo: AiOutlineLineChart },
    { option: "Warehouse", logo: AiOutlineSetting },
    { option: "Edit Managers", logo: FiEdit },]
  }else{
    data = [{ option: "Mini Stores", logo: AiOutlineLineChart },
    { option: "SOP", logo: AiOutlineSetting },
    { option: "Inventory", logo: FiEdit },]
  }

  return <div className='flex flex-col max-w-7xl mx-auto m-3 space-y-3 items-center justify-center min-h-[80vh]'>
    {data.map((obj) => {
      return <Link key={obj.option} to={obj.option === "Stores" ? "/shops" : obj.option === "Edit Managers" ? "/mannager" : obj.option === 'Mini Stores' ? "/minishops/"+shopId : ""  } className='w-full px-3 py-2 flex items-center justify-between max-w-xs rounded-md border shadow-lg hover:scale-105'>
        <AiOutlineLineChart size={25} />
        <p>
          {obj.option}
        </p>
        <AiOutlineRight size={25} />
      </Link>
    })}
  </div>
}
export default withUser(StoreOptions);