import { FC } from 'react'
import { IoCaretDown } from 'react-icons/io5'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
// import './styles.module.scss'

type P = {}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return <Box sx={{ display: "flex", alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }} >
            <LinearProgress variant='determinate' {...props} />
        </Box>
    </Box>
}

const Inventory: FC<P> = () => {
    return <div className='max-w-6xl mx-auto'>

        {
            [...Array(3).keys()].map(() => {
                return <div className=' text-md flex items-center justify-between border rounded-xl p-3 m-2'>
                    <p className=' font-bold  text-[#BD802F]'> Himanshu</p>
                    <IoCaretDown size={25} />
                </div>
            })
        }

        <div className=' w-2/3 flex items-center justify-between p-3 m-2'>
            <p className='text-sm w-fit'>Apple(in kg)</p>
            <Box>
                <LinearProgressWithLabel value={20} />
            </Box>
        </div>

    </div>
}
export default Inventory;