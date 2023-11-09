import { FC, InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
// import Input from '../Components/UI-Components/Input'
type P = {
    Icon: IconType
} & InputHTMLAttributes<HTMLInputElement>

const CustomInput: FC<P> = ({ Icon , ...rest }) => {
    return <div className='flex flex-col'>
        <div className='flex items-center gap-2 relative '>
            <Icon size={20} className="absolute left-2" />
            <input {...rest} className=' w-full px-10 py-2 rounded-md border border-gray-200 bg-transparent'  />
        </div>
    </div>
}
export default CustomInput;