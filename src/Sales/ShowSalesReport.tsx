import { FC, useState } from 'react'
import { withShop } from '../HOC/withShop'
import { Sales } from '../Typings/Shop'
import { Link } from 'react-router-dom'
import Error from '../Components/Error/404Page'
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material'
import ApprovalStatus from '../Components/UI-Components/ApprovalStatus'
import ImageViwer from '../Components/UI-Components/ImageViwer'

type P = {
    dailySales: { result: Sales, message: string }
}
const ShowSalesReport: FC<P> = ({ dailySales }) => {
    console.log("dailySales : ", dailySales);
    

    const [open, setOpen] = useState(false);

    if (dailySales.result === null) {
        return <Error message={dailySales.message} />
    }
    const date =  new Date(dailySales?.result?.date);

    return <div className=' min-h-[80vh] max-w-5xl mx-auto flex justify-center items-center '>

        <div className=' w-1/2 min-h-[20vh] text-center space-y-5 py-5 border m-4 shadow-md rounded-md flex flex-col p-2  '>
            <h1 className='text-xl font-bold '>Sales Datails</h1>
            <p><span className='  font-bold text-lg'> Date :</span> {date.toISOString()}</p>
            <p><span className='font-bold text-lg'>Total Sales :</span> {dailySales?.result.totalSales}</p>
            {dailySales?.result?.imageUrl ? <img className='cursor-pointer' src={dailySales?.result?.imageUrl} alt="sales image" onClick={() => setOpen(!open)} /> : "No Sales Image Found"}

            <ImageViwer imageUrl={dailySales?.result?.imageUrl!} open={open} setOpen={setOpen}  />
            <Dialog open={open} onClose={() => { setOpen(!open) }} className=' relative flex flex-col  ' >
                <img src={dailySales?.result?.imageUrl!} alt="sales image" />
                <Button onClick={() => setOpen(!open)} children="OK" variant='contained' className='w-fit self-center bottom-4  ' sx={{ position: 'absolute' }} />
            </Dialog>

            <ApprovalStatus message={"Owner approval status"} status={dailySales.result.miniOwnerConsentStatus} />
            <ApprovalStatus message={"Mini store Owner approval status"} status={dailySales.result.ownerConsentStatus} />


            <Link to={"/"} className='px-3 py-1 bg-indigo-400 rounded-md shadow-md text-white my-3 hover:scale-95 ' >back to Shops</Link>
        </div>

    </div>
}
export default withShop(ShowSalesReport);