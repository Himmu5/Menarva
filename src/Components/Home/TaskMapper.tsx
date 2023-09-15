import {FC} from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs'
type P = {
    dummyOptions : string[]
}
const TaskMapper:FC<P> =({ dummyOptions })=>{
  return  <div className='w-full flex flex-col gap-3 my-3 p-2 text-black'>
  {
      dummyOptions.map((option)=>{
          return <div className='flex items-center p-3 justify-between w-full border rounded-xl'>
              <p>{option}</p>
              <BsFillCaretDownFill size={20}/>
          </div>
      })
  }
</div>
}
export default TaskMapper;