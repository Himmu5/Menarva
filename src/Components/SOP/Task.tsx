import { FC, useState } from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BiSolidUpArrow } from 'react-icons/bi'
import UploadButton from '../UI-Components/UploadButton';
import { Sops } from '../../Typings/sops';
import { Link } from 'react-router-dom';
import { withSops } from '../../HOC/withProvider';

type P = {
    Sops: Sops;
    setSelectedSop: (s:{sop:Sops , taskId : number})=>void;
}

const TaskComp: FC<P> = ({ Sops , setSelectedSop }) => {

    const [showOptions, setShowOptions] = useState(false);

    return <div key={Sops.name} className=' shadow-md flex flex-col p-3 py-2 justify-between w-full border rounded-xl'>
        <div className='flex items-center justify-between'>
            <p>{Sops.name}</p>

            {showOptions === true ? <BiSolidUpArrow className="cursor-pointer" size={20} onClick={() => setShowOptions(!showOptions)} /> : <BsFillCaretDownFill size={20} onClick={() => setShowOptions(!showOptions)} className="cursor-pointer" />}

        </div>

        { showOptions && <div className=' duration-500 w-full flex flex-col gap-1 text-xs p-2 border rounded-xl shadow-sm my-2 '>
            {
               Sops.tasks.map((o) => {
                    return <div key={o.name} className='flex items-center justify-between'>
                        <p>{o.name}</p>
                        { o.imgUrl===null ? <Link to={"/Camera"} onClick={()=>setSelectedSop({ sop : Sops , taskId : +o.id })} className='px-3 py-1 bg-blue-500 text-white rounded-md'>Mark as done</Link> : <UploadButton /> }
                    </div>
                })
            }
        </div>
        }
    </div>
}
export default withSops(TaskComp);