import { FC, useState } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@mui/material';
import { BsFillCaretDownFill } from 'react-icons/bs';
import ProgressBar from './ProgressBar';

type P = {
    fruits: string[];
    title: string
}

const Option: FC<P> = ({ fruits, title }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };
    return <div>
        <Accordion expanded={expanded} onChange={handleExpand} style={{ color: "#8F5843", borderRadius: 10 }} >
            <AccordionSummary expandIcon={<BsFillCaretDownFill />}>
                <Typography style={{ fontWeight: 'bold' }} variant="h6" >{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul className='flex flex-col gap-2'>
                    {fruits.map((subOption) => (
                        <div className='flex items-center rounded-md shadow-md p-3 gap-1'>
                            <Typography width={200} variant="inherit" >{subOption}</Typography>

                            <ProgressBar value={5} />

                        </div>
                    ))}
                </ul>
            </AccordionDetails>
        </Accordion>
    </div>
}
export default Option;