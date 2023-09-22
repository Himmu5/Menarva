import {FC} from 'react'

type P = object

const StoreOptions:FC<P> =()=>{
  return <div className='flex flex-col '>
    {  [...Array(3).keys()].map(()=>{
        return <div>

        </div>
    })}      
</div>
}
export default StoreOptions;