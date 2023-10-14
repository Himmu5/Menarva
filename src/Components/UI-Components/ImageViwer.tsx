import { Button, Dialog } from '@mui/material'
import { FC } from 'react'
type P = {
    imageUrl : string;
    open: boolean;
    setOpen: (a: boolean) => void;
}
const ImageViwer: FC<P> = ({ imageUrl , open , setOpen}) => {
    return <Dialog open={open} onClose={() => { setOpen(!open) }} className=' relative flex flex-col  ' >
        <img src={imageUrl} alt="sales image" />
        <Button onClick={() => setOpen(!open)} children="OK" variant='contained' className='w-fit self-center bottom-4  ' sx={{ position: 'absolute' }} />
    </Dialog>
}
export default ImageViwer;