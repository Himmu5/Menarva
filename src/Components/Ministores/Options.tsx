import { FC } from 'react'
import { AiOutlineLineChart, AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
type P = {}
const MiniOptions: FC<P> = () => {
    const data = [
        "Sales"
    ]
    return <div className=' h-[80vh] w-full flex justify-center items-center flex-col '>

            {data.map((obj) => {
                return <Link to={"/calendar"} className='w-full px-3 py-2 flex items-center justify-between max-w-xs rounded-md border shadow-lg hover:scale-105'>
                    <AiOutlineLineChart size={25} />
                    <p>
                        {obj}
                    </p>
                    <AiOutlineRight size={25} />
                </Link>
            })
            }
    </div>
}
export default MiniOptions;