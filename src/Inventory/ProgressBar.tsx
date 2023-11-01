import { FC } from 'react'
type P = {
    value :number
}
const ProgressBar: FC<P> = ({ value }) => {
    let statusColor = ""

    if (value > 15) {
        statusColor = "bg-green-600"
    }
    else if(value <= 15 && value > 10){
        statusColor = "bg-yellow-600"
    }else if(value  <= 10 ){
        statusColor = "bg-red-600"
    }

    return <div className='w-full text-xs '>
        <div className="flex justify-between mb-1">
            <span className="text-xs ">0</span>
            <span className="text-xs   ">20</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2  ">
            <div className={" h-2 rounded-full "+statusColor } style={{ "width": `${value * 5}%` }}></div>
        </div>
    </div>
}
export default ProgressBar;