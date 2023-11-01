import { FC, useState } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@mui/material';
import { BsFillCaretDownFill } from 'react-icons/bs';

type P = {
    fruits: string[];
    title: string
}

const Option: FC<P> = ({ fruits, title }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };
    return <div >
        <Accordion expanded={expanded} onChange={handleExpand} style={{ borderRadius: 10 }} >
            <AccordionSummary expandIcon={<BsFillCaretDownFill />}>
                <Typography variant="subtitle1" >{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul className='flex flex-col gap-2'>
                    {fruits.map((subOption, index) => (
                        <Accordion sx={{ padding: 1 }} style={{ borderRadius: 10 }} >
                            <Typography variant="body1">{subOption}</Typography>
                        </Accordion>
                    ))}
                </ul>
            </AccordionDetails>
        </Accordion>
    </div>
}
export default Option;