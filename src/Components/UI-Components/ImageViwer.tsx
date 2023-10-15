import { Button, Dialog } from '@mui/material'
import { FC } from 'react'

type P = {
    imageUrl: string;
    open: boolean;
    setOpen: (a: boolean) => void;
}

const ImageViwer: FC<P> = ({ imageUrl, open, setOpen }) => {
    return <Dialog open={open} onClose={() => { setOpen(!open) }} className=' flex flex-col '  >
        <div className='p-4 relative '>
            <img src={imageUrl} alt="sales image" />
            <Button onClick={() => setOpen(!open)} children="OK" variant='contained' className='w-fit self-center bottom-8 right-[43%]  ' sx={{ position: 'absolute' }} />
        </div>
    </Dialog>
}
export default ImageViwer;