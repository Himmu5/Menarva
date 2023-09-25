import { FC } from 'react'
import { AiOutlineRight , AiOutlineSetting } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type P = object

const StoreOptions: FC<P> = () => {

  const data = [
    "SOPS",
    "Sales & Accounting",
    "Edit Managers",
  ]

  return <div className='flex flex-col max-w-7xl mx-auto m-3 space-y-3 items-center justify-center min-h-[80vh]'>
    {data.map((option) => {
      return <Link to={option === "SOPS" ? "/" : option === "Sales & Accounting" ? "/Stores" : "/"} className='w-full px-3 py-2 flex items-center justify-between max-w-xs rounded-md border shadow-lg hover:scale-105'>
        <AiOutlineSetting size={25} />
        <p>
          {option}
        </p>
        <AiOutlineRight size={25} />
      </Link>
    })}
  </div>
}
export default StoreOptions;