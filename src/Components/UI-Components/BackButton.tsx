import { Button } from '@mui/material';
import { FC } from 'react'
import { AiOutlineRollback } from 'react-icons/ai'

type P = {}

const BackButton: FC<P> = () => {
    return <Button children="back" color='inherit' startIcon={<AiOutlineRollback size={25} />} variant='contained' />
}
export default BackButton;  