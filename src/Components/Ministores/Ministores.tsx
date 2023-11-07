import { FC, useEffect } from 'react'
import { MiniShop } from '../../Typings/Shop'
import Error from '../Error/404Page'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Loader/Loading'
import BackButton from '../UI-Components/BackButton'
import { UserClass } from '../../Typings/User'
import { withShop, withUser } from '../../HOC/withProvider'

type P = {
    miniShopsData: { message: string, result: MiniShop[] };
    getMiniStores: (id: number) => void;
    loading: boolean;
    shopId: number;
    user:UserClass;
    setMiniShop : (m : MiniShop)=>void
}

const MiniStores: FC<P> = ({setMiniShop  , miniShopsData, getMiniStores, user, shopId }) => {
    // console.log("ministores ",miniShopsData);
    
    const Navigate = useNavigate();
    useEffect(() => {

        getMiniStores(shopId);

    }, [shopId])

    if (!miniShopsData) {
        return <Loading />
    }
    if (miniShopsData.result === null) {
        return <Error message={miniShopsData.message} />
    }

    return <div className=' m-2 max-w-7xl mx-auto my-5 flex flex-col gap-5 ' >
        { user.role == 1 && <div className='w-fit px-3' onClick={()=>Navigate(-1)}><BackButton /></div> }
        {
            miniShopsData.result.map((mini) => {
                return <Link onClick={()=>setMiniShop(mini)} to={"/ministore/options"} className='rounded-md shadow-md cursor-pointer shadow-gray-400 pl-[10%] m-3 ' key={mini.id}>
                    <div className='flex items-center min-h-[250px] gap-2'>
                        <p>{mini.name}</p>
                        <p>[Branch Name]</p>
                    </div>
                </Link>
            })
        }
    </div>
}
export default withUser(withShop(MiniStores));