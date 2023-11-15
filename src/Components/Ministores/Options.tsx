import { FC } from 'react'
import { AiOutlineLineChart, AiOutlineRight } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserClass } from '../../Typings/User'
import BackButton from '../UI-Components/BackButton'
import { withShop, withUser } from '../../HOC/withProvider'
import { MiniShop } from '../../Typings/Shop'

type P = {
    user: UserClass;
    miniShop: MiniShop
}

const MiniOptions: FC<P> = ({ user, miniShop }) => {
    const Navigate = useNavigate();
    const data = [
        "Sales"
    ]
    return <div className='max-w-7xl mx-auto relative'>
        <div className='flex items-center px-4 gap-2 justify-between '>
            <div className='w-fit px-3 py-5 ' onClick={() => Navigate(-1)}><BackButton /></div>
            <div className='flex items-center gap-2'> <p className='font-bold '>Mini Shop :</p> <p className='text-blue-800'> {miniShop.name}</p></div>
        </div>

        <div className=' h-[80vh] w-full flex justify-center items-center flex-col '>

            {data.map((option) => {
                return <Link key={option} to={user.role === 1 ? "/calendar" : "/ministore/uploadsales"} className='w-full px-3 py-2 flex items-center justify-between max-w-xs rounded-md border shadow-lg hover:scale-105'>
                    <AiOutlineLineChart size={25} />
                    <p>
                        {option}
                    </p>
                    <AiOutlineRight size={25} />
                </Link>
            })
            }
        </div>
    </div>
}
export default  withShop(withUser(MiniOptions));