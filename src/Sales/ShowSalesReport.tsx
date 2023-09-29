import { FC } from 'react'
import { withShop } from '../HOC/withShop'
import { Sales } from '../Typings/Shop'
import { Link } from 'react-router-dom'
type P = {
    dailySales: { result: Sales }
}
const ShowSalesReport: FC<P> = ({ dailySales }) => {
    console.log("daily sales : ", dailySales);
    return <div className='min-h-[80vh] maxw-5xl mx-auto flex justify-center items-center '>

        <div className='min-h-[20vh] w-full text-center space-y-3 py-5 border m-4 shadow-md rounded-md '>
            <h1 className='text-xl font-bold '>Sales Datails</h1>
            <p><span className='  font-bold text-lg'> Date :</span> {dailySales.result.date.toLocaleString()}</p>
            <p><span className='font-bold text-lg'>Total Sales :</span> {dailySales.result.totalSales}</p>
            <Link to={"/shops"} className='px-3 py-1 bg-indigo-400 rounded-md shadow-md text-white my-3 hover:scale-95 ' >back to Shops</Link>
        </div>
        
    </div>
}
export default withShop(ShowSalesReport);