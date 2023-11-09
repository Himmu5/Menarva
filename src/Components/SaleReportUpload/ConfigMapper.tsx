import { FC } from 'react'
import { Authorities } from '../../Typings/Manager'
type P = {
    editConfig: Authorities,
    values: { type: string }
}
const ConfigMapper: FC<P> = ({ editConfig, values }) => {
    return <div>
        {
            (editConfig && values.type.length > 0) && Object.keys(editConfig).map((option) => {
                return <div className='gap-2' key={option}>
                    <p className='font-bold text-lg'>{option}</p>
                    {
                        Object.keys(editConfig[option as keyof Authorities]).map((o) => {
                            return <div key={o} className=' px-3 flex flex-col my-2 space-y-1'>
                                <p>{o}</p>
                                <select value={editConfig[option][o]} className='border p-1 rounded-md' >
                                    <option value={true} >true</option>
                                    <option value={false}>false</option>
                                </select>
                            </div>
                        })
                    }

                </div>
            })
        }

    </div>
}
export default ConfigMapper;