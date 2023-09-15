import { FC, InputHTMLAttributes } from 'react'

type P = object & InputHTMLAttributes<HTMLInputElement>

const Input: FC<P> = ({ className , ...rest }) => {
    return <input className={'px-10 py-2 border rounded-md '+className} {...rest} />
}
export default Input;