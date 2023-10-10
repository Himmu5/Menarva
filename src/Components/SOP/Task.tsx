import { FC, useState } from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BiSolidUpArrow } from 'react-icons/bi'
import UploadButton from '../UI-Components/UploadButton';
import { Sops, Task } from '../../Typings/sops';

type P = {
    Sops: Sops
}

const TaskComp: FC<P> = ({ Sops }) => {

    const [showOptions, setShowOptions] = useState(false);

    return <div key={Sops.name} className=' shadow-md flex flex-col p-3 justify-between w-full border rounded-xl'>
        <div className='flex items-center justify-between'>
            <p>{Sops.name}</p>

            {showOptions === true ? <BiSolidUpArrow className="cursor-pointer" size={20} onClick={() => setShowOptions(!showOptions)} /> : <BsFillCaretDownFill size={20} onClick={() => setShowOptions(!showOptions)} className="cursor-pointer" />}

        </div>

        { showOptions && <div className=' w-full flex flex-col gap-1 text-xs p-2 border rounded-xl shadow-sm my-2 '>
            {
               Sops.tasks.map((o) => {
                    return <div key={o.name} className='flex items-center justify-between'>
                        <p>{o.name}</p>
                        { o.imgUrl===null ? <p className='px-3 py-1 bg-blue-500 text-white rounded-md'>Mark as done</p> : <UploadButton /> }
                    </div>
                })
            }
        </div>
        }
    </div>
}
export default TaskComp;