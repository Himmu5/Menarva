import { FC } from 'react'
import { withShop } from '../../HOC/withShop'
import { Shop } from '../../Typings/Shop'
import { Link } from 'react-router-dom';
import Loading from '../../Loader/Loading';
import { Manager } from '../../Typings/Manager';
import Avatar from '../UI-Components/ManagerAvatar';

type P = {
    shops: {
        [key: string]: {
            store: Shop;
            Managers: Manager[];
        };
    };
    setSelectedShop: (s: Shop) => void;
}

const stores: FC<P> = ({ shops, setSelectedShop }) => {

    if (!shops) {
        return <Loading />
    }

    return <div className=' m-2 max-w-7xl mx-auto my-5 flex flex-col gap-5 w-full ' >
        {
            Object.keys(shops).map((key) => {
                const shop = shops[key as keyof typeof shops].store;
                return <div key={key} className='w-full relative flex flex-col ' > <Link key={key} to={"/shop/options"} onClick={() => setSelectedShop(shop)} className=' w-full rounded-md shadow-md cursor-pointer shadow-gray-400 pl-[10%] m-3 '>
                    <div className='flex items-center min-h-[250px] gap-2'>
                        <p>{shop.name}</p>
                        <p>[Branch Name]</p>
                    </div>
                </Link>
                    <div className='flex items-center absolute z-10 bottom-6 gap-2 right-4'>
                        <p className='font-bold'>Managers :  </p>
                        <Avatar Managers={shops[key].Managers} />
                    </div>
                </div>
            })
        }
    </div>
}
export default withShop(stores);