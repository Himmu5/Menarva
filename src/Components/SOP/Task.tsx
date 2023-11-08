import { FC, useState } from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BiSolidUpArrow } from 'react-icons/bi'
import { Sops, Task } from '../../Typings/sops';
import { withSops, withUser } from '../../HOC/withProvider';
import { UserClass } from '../../Typings/User';
import SubTasks from './SubTasks';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ProgressBar from '../../Inventory/ProgressBar';

type P = {
    Sops: Sops;
    setSelectedSop: (s: { sop: Sops, taskId: number }) => void;
    sopStatus: string;
    user: UserClass
}

const TaskComp: FC<P> = ({ Sops, sopStatus, user , setSelectedSop }) => {

    const [showOptions, setShowOptions] = useState(false);
    // const CLASS = 'px-3 py-1 bg-blue-500 text-white rounded-md'
   
    // if(Sops.status === 1){
    //     return <div></div>
    // }

    let filterTask =  [] as Task[];
    if(sopStatus === "ALL"){
        filterTask = Sops.tasks
    }
    if(sopStatus === "PENDING"){
        filterTask = Sops.tasks.filter((o)=> o.status === 1 )
    }
    if(sopStatus === "COMPLETED"){
        filterTask = Sops.tasks.filter((o)=> o.status === 2)
    }
    const [expanded , setExpanded] = useState(false);
    function handleExpand() {
        setExpanded(!expanded)
    }
   

   
    return  filterTask.length !==0 && <Accordion expanded={expanded} onChange={handleExpand} style={{ color: "#8F5843", borderRadius: 10 }} >
    <AccordionSummary expandIcon={<BsFillCaretDownFill />}>
        <Typography style={{ fontWeight: 'bold' }} variant="inherit" >{Sops.name}</Typography>
    </AccordionSummary>
    <AccordionDetails>
        <ul className='flex flex-col gap-1'>
            {filterTask.length !== 0 && filterTask.map((subOption) => (
                <div className=' mx-5 flex items-center rounded-md shadow-md p-3 '>
                    <SubTasks setSelectedSop={setSelectedSop} o={subOption} sopStatus={sopStatus} Sops={Sops} user={user} />
                </div>
            ))}
        </ul>
    </AccordionDetails>
</Accordion>
}
export default withUser(withSops(TaskComp))
