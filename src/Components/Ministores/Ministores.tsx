import { FC, useEffect } from 'react'
import { withShop } from '../../HOC/withShop'
import { MiniShop } from '../../Typings/Shop'
import Error from '../Error/404Page'
import { Link, useParams } from 'react-router-dom'

type P = {
    miniShopsData: { message: string, result: MiniShop[] };
    getMiniStores : (id : number)=>void;
    loading : boolean;
    shopId : number
}

const MiniStores: FC<P> = ({ miniShopsData , getMiniStores , loading , shopId }) => {
    // const shopId = +useParams().id!;

    useEffect(()=>{
        
        getMiniStores(shopId);

    },[shopId])

    if(loading){
        return <div>Loading....</div>
    }
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