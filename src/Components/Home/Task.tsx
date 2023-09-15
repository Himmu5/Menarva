import { FC, useState } from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs';
import UploadButton from '../UI-Components/UploadButton';

type P = {
    option: {
        Heading: string;
        options: string[];
    }
}

const Task: FC<P> = ({ option }) => {

    const [showOptions, setShowOptions] = useState(false);

    return <div key={option.Heading} className=' shadow-md flex flex-col p-3 justify-between w-full border rounded-xl'>
        <div className='flex items-center justify-between'>
            <p>{option.Heading}</p>
            <BsFillCaretDownFill size={20} onClick={() => setShowOptions(!showOptions)} />
        </div>

        {showOptions && <div className=' w-full flex flex-col gap-1 text-xs p-2 border rounded-xl shadow-sm my-2 '>
            {
                option.options.map((o) => {
                    return <div key={o} className='flex items-center justify-between'>
                        <p>{o}</p>
                        <UploadButton />
                    </div>
                })
            }
        </div>
        }
    </div>
}
export default Task;