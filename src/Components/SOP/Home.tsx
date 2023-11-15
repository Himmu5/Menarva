import { FC, useEffect } from 'react'
// import { RxHamburgerMenu } from 'react-icons/rx'
import TaskMapper from './TaskMapper'
import { withShop, withSops, withUser } from '../../HOC/withProvider'
import { Sops } from '../../Typings/sops'
import SelectionOption from '../UI-Components/SelectionOption'
import Loading from '../../Loader/Loading'
import { Shop } from '../../Typings/Shop'
import BackButton from '../UI-Components/BackButton'
import { useNavigate } from 'react-router-dom'
import { UserClass } from '../../Typings/User'

type P = {
    sops: Sops[];
    getSOPs: () => void
    sopDate: Date;
    selectedShop: Shop;
    user: UserClass
}

const Home: FC<P> = ({ sops, getSOPs, sopDate, selectedShop , user }) => {
    
    useEffect(() => {
        getSOPs();
    }, [])
    const Navigate = useNavigate();

    if (!sops) {
        return <Loading />
    }
    function formatDateToYYYYMMDD(date: Date): string {
        const year = date?.getFullYear();
        const month = String(date?.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date?.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const date = formatDateToYYYYMMDD( user.role ==2 ? new Date() : sopDate);

    return <div className='max-w-7xl mx-auto flex flex-col'>
        <div className='flex items-center justify-between px-3 '>
            <div className='w-fit px-3 ' onClick={() => Navigate(-1)}><BackButton /></div>
            <div>
                <div className='flex items-center gap-2'>
                    <p className='font-bold'>Date :</p>
                    <p> {date}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='font-bold'>{user?.entities[0]?.type === 1 ? "Shop :" : "Warehouse :"  }</p>
                    <p> {user?.entities[0]?.name }</p>
                </div>
            </div>
        </div>
        <SelectionOption list={['ALL', 'PENDING', 'COMPLETED']} />
        <TaskMapper sops={sops} />

    </div>
}
export default withUser(withShop(withSops(Home)));