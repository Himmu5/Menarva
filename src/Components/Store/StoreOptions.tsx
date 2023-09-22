import { FC } from 'react'

type P = object

const StoreOptions: FC<P> = () => {

  const data = [
    "Ministores",
    "Inventory",
    "SOPS"
  ]

  return <div className='flex flex-col max-w-7xl mx-auto m-3 space-y-3 '>
    {data.map((option) => {
      return <div className='px-3 py-2 rounded-md border shadow-lg hover:scale-105'>
        {option}
      </div>
    })}
  </div>
}
export default StoreOptions;