import {FC} from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type P = {}

const Loading:FC<P> =()=>{
  return <div className='min-h-[80vh] flex justify-center items-center '>
      <AiOutlineLoading3Quarters size={30} className="animate-spin text-indigo-600" />
</div>
}
export default Loading; 