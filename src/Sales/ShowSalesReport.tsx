import { FC, useState } from 'react'
import { withShop } from '../HOC/withShop'
import { Sales } from '../Typings/Shop'
import { Link } from 'react-router-dom'
import Error from '../Components/Error/404Page'
import ImageViwer from '../Components/UI-Components/ImageViwer'

type P = {
    dailySales: { result: Sales, message: string }
}
const ShowSalesReport: FC<P> = ({ dailySales }) => {
    
    const [ open , setOpen ] = useState(false);

    if (dailySales.result === undefined) {
        return <Error message={dailySales.message} />
    }

    
    return <div className='min-h-[80vh] max-w-5xl mx-auto flex justify-center items-center '>

        <div className='min-h-[20vh] w-1/3 text-center space-y-5 py-5 border m-4 shadow-md rounded-md flex flex-col p-2  '>
            <h1 className='text-xl font-bold '>Sales Datails</h1>
            <p><span className='  font-bold text-lg'> Date :</span> {dailySales?.result.date.toLocaleString()}</p>
            <p><span className='font-bold text-lg'>Total Sales :</span> {dailySales?.result.totalSales}</p>
            {dailySales?.result?.imageUrl ? <img src={dailySales?.result?.imageUrl} alt="sales image" onClick={()=>setOpen(!open)} /> : "No Sales Image Found"}

            <ImageViwer imageUrl={dailySales?.result?.imageUrl!} open={open} setOpen={setOpen}  />

            <Link to={"/"} className='px-3 py-1 bg-indigo-400 rounded-md shadow-md text-white my-3 hover:scale-95 ' >back to Shops</Link>
        </div>

    </div>
}
export default withShop(ShowSalesReport);