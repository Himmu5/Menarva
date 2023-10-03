import { FC } from 'react'
import { withShop } from '../../HOC/withShop'
import { Shop } from '../../Typings/Shop'
import { Link } from 'react-router-dom';
import Loading from '../../Loader/Loading';

type P = {
    shops: Shop[];
    setSelectedShop: (s:Shop) => void;
}

const stores: FC<P> = ({ shops, setSelectedShop }) => {

    if(!shops){
        return <Loading /> 
    }

    return <div className=' m-2 max-w-7xl mx-auto my-5 flex flex-col gap-5 ' >
        {
            shops.map((shop) => {
                return <Link to={"/shop/options"} onClick={() => setSelectedShop(shop)} className='rounded-md shadow-md cursor-pointer shadow-gray-400 pl-[10%] m-3 ' key={shop.id}>
                    <div className='flex items-center min-h-[250px] gap-2'>
                        <p>{shop.name}</p>
                        <p>[Branch Name]</p>
                    </div>
                </Link>
            })
        }
    </div>
}
export default withShop(stores);