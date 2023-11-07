import { MdCameraAlt } from 'react-icons/md'
import { FC } from 'react'

type P = {
  text: string;
  color: "red" | "blue"
  disable ?: boolean
}

const UploadButton: FC<P> = ({ text, color , disable }) => {
  return <div className={'w-fit flex cursor-pointer items-center gap-1 rounded-md px-3 py-1 text-white text-sm '+
  (color == "red" &&  " bg-red-500 ")
  +(color == "blue" && " bg-blue-500 ")+
  (disable && " bg-green-500 cursor-none ")
   }>
    <MdCameraAlt />
    <p>{text}</p>
  </div>
}
export default UploadButton;