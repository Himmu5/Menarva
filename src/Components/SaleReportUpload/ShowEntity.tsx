import { FC } from 'react'
import { Manager } from '../../Typings/Manager'
import { RxCross2 } from 'react-icons/rx'
import { UserClass } from '../../Typings/User';
type P = {
    singleManager: { entity: Manager , user : UserClass };
    detachToShopManager: (a: number, b: number) => void
}
const ShowEntity: FC<P> = ({ singleManager , detachToShopManager }) => {

    return <div>


        {singleManager?.entity === null && <div>No shop associated</div>}

        {
            singleManager?.entity && <div>
                <p className='font-bold '>Attached Shops</p>
                <div className='flex justify-between items-center '>
                    <p>{singleManager?.entity.name}</p>
                    <RxCross2 className=" cursor-pointer " onClick={() => detachToShopManager(singleManager?.entity.id, singleManager?.user.id)} />
                </div>
            </div>
        }

    </div>
}
export default ShowEntity;