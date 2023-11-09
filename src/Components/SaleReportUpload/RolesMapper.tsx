import { FC } from 'react'
import { Role } from '../../Typings/Manager'
type P = {
    roles: Role[]
}
const RolesMapper: FC<P> = ({ roles }) => {
    return <> 
    {
        roles.map((d, index) => {
            return <option key={index} className='p-2 border ' value={d.name}>{d.name}</option>
        })
    }
</>} 
export default RolesMapper;