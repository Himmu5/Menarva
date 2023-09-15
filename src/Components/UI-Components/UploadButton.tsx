import { MdCameraAlt } from 'react-icons/md'
import {FC} from 'react'

type P = object

const UploadButton:FC<P> =()=>{
  return <div className=' flex items-center gap-1 bg-blue-500 rounded-md px-3 py-1 text-white text-sm '>
    <MdCameraAlt />
    <p>Upload</p>
</div>
}
export default UploadButton;