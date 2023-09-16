import {FC} from 'react'

type P = object

const stores:FC<P> =()=>{
  return <div className=' m-2 max-w-7xl mx-auto my-5 flex flex-col gap-5 ' >
      {
        [...Array(4).keys()].map((id )=>{
            return <div className='rounded-md shadow-md cursor-pointer shadow-gray-400 pl-[10%] m-3 ' key={id}>
                <div className='flex items-center min-h-[250px] gap-2'>
                    <p>STORENAME1</p>
                    <p>[Branch Name]</p>
                </div>
            </div>
        })
      }
</div>
}
export default stores;