import { FC } from 'react'
import { AiOutlineLineChart, AiOutlineRight } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserClass } from '../../Typings/User'
import BackButton from '../UI-Components/BackButton'
import { withUser } from '../../HOC/withProvider'

type P = {
    user: UserClass
}

const MiniOptions: FC<P> = ({ user }) => {
    const Navigate = useNavigate();
    const data = [
        "Sales"
    ]
    return <div className='max-w-7xl mx-auto relative'>
        <div className='w-fit px-3 py-5 absolute' onClick={() => Navigate(-1)}><BackButton /></div>

        <div className=' h-[80vh] w-full flex justify-center items-center flex-col '>

            {data.map((obj) => {
                return <Link to={user.role === 1 ? "/calendar" : "/ministore/uploadsales"} className='w-full px-3 py-2 flex items-center justify-between max-w-xs rounded-md border shadow-lg hover:scale-105'>
                    <AiOutlineLineChart size={25} />
                    <p>
                        {obj}
                    </p>
                    <AiOutlineRight size={25} />
                </Link>
            })
            }
        </div>
    </div>
}
export default withUser(MiniOptions);