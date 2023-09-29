import { FC } from 'react'
import { withShop } from '../../HOC/withShop'
import { MiniShop } from '../../Typings/Shop'
import Error from '../Error/404Page'
import { Link } from 'react-router-dom'

type P = {
    miniShopsData: { message: string, result: MiniShop[] }
}

const MiniStores: FC<P> = ({ miniShopsData }) => {
    console.log("Data : ", miniShopsData);

    if (miniShopsData.result === null) {
        return <Error message={miniShopsData.message} />
    }

    return <div className=' m-2 max-w-7xl mx-auto my-5 flex flex-col gap-5 ' >
        {
            miniShopsData.result.map((mini) => {
                return <Link to={"/ministore/options"} className='rounded-md shadow-md cursor-pointer shadow-gray-400 pl-[10%] m-3 ' key={mini.id}>
                    <div className='flex items-center min-h-[250px] gap-2'>
                        <p>{mini.name}</p>
                        <p>[Branch Name]</p>
                    </div>
                </Link>
            })
        }
    </div>
}
export default withShop(MiniStores);