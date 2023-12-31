import { FC, InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import Input from '../Components/UI-Components/Input'
type P = {
    Icon: IconType
} & InputHTMLAttributes<HTMLInputElement>

const CustomInput: FC<P> = ({ Icon , ...rest }) => {
    return <div className='flex flex-col'>
        <div className='flex items-center gap-2 relative '>
            <Icon size={20} className="absolute left-2" />
            <Input value={rest.value} onChange={rest.onChange} className=' w-full placeholder:text-white text-white border border-gray-200 bg-transparent' name="bill" id="bill" />
        </div>
    </div>
}
export default CustomInput;