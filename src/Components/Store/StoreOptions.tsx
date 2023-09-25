import { FC } from 'react'
import { AiOutlineRight, AiOutlineSetting, AiOutlineLineChart } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type P = object

const StoreOptions: FC<P> = () => {

  const data = [
    { option: "SOPS", logo: AiOutlineLineChart },
    { option: "Sales & Accounting", logo: AiOutlineSetting },
    { option: "Edit Managers", logo: FiEdit },
  ]

  return <div className='flex flex-col max-w-7xl mx-auto m-3 space-y-3 items-center justify-center min-h-[80vh]'>
    {data.map((obj) => {
      return <Link to={obj.option === "SOPS" ? "/" : obj.option === "Sales & Accounting" ? "/Stores" : "/mannager"} className='w-full px-3 py-2 flex items-center justify-between max-w-xs rounded-md border shadow-lg hover:scale-105'>
        <obj.logo size={25} />
        <p>
          {obj.option}
        </p>
        <AiOutlineRight size={25} />
      </Link>
    })}
  </div>
}
export default StoreOptions;