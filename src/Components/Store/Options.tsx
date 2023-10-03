import { FC } from 'react'
import { AiOutlineLineChart, AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { withShop } from '../../HOC/withShop'
import { Shop } from '../../Typings/Shop'

type P = {
    selectedShop: Shop
}
const Options: FC<P> = ({ selectedShop }) => {
    console.log("Selected Shop : ", selectedShop);
    const op = [
        "Mini Stores",
        "Inventory",
        "SOP"
    ]

    return <>

     

        <div className='min-h-[80vh] flex justify-center items-center flex-col gap-3'>
            {op.map((obj) => {
                return <Link key={obj} to={obj === "Mini Stores" ? "/minishops/" + selectedShop.id : obj === "SOP" ? "/SOP" : "/mannager"} className='w-full px-3 py-2 flex items-center justify-between max-w-xs rounded-md border shadow-lg hover:scale-105'>
                    <AiOutlineLineChart size={25} />
                    <p>
                        {obj}
                    </p>
                    <AiOutlineRight size={25} />
                </Link>
            })}
        </div>
    </>

}
export default withShop(Options);