import { FC, useState } from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BiSolidUpArrow } from 'react-icons/bi'
import { Sops, Task } from '../../Typings/sops';
import { withSops } from '../../HOC/withProvider';
import { withUser } from '../../HOC/withUser';
import { UserClass } from '../../Typings/User';
import SubTasks from './SubTasks';

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
    if(sopStatus === "PENDING"){
        filterTask = Sops.tasks.filter((o)=> o.status === 1 )
    }
    if(sopStatus === "COMPLETED"){
        filterTask = Sops.tasks.filter((o)=> o.status === 2)
    }
    if(sopStatus === "ALL"){
        filterTask = Sops.tasks
    }

    return filterTask.length !==0 && <div key={Sops.name} className=' shadow-md flex flex-col p-3 py-2 justify-between w-full border rounded-xl'>
        <div className='flex items-center justify-between'>
            <p>{Sops.name}</p>

            {showOptions === true ? <BiSolidUpArrow className="cursor-pointer" size={20} onClick={() => setShowOptions(!showOptions)} /> : <BsFillCaretDownFill size={20} onClick={() => setShowOptions(!showOptions)} className="cursor-pointer" />}

        </div>

        {showOptions && <div className=' duration-500 w-full flex flex-col gap-1 text-xs p-2 border rounded-xl shadow-sm my-2 '>
            {
              filterTask.length !== 0 && filterTask.map((o) => {
                    return <SubTasks setSelectedSop={setSelectedSop} o={o} sopStatus={sopStatus} Sops={Sops} user={user} />
                })
            }
        </div>
        }
    </div>
}
export default withUser(withSops(TaskComp))

// { ( o.imgUrl === null && sopStatus === "PENDING" && <div className=''>unavailable</div> )|| o.imgUrl === null ?<Link to={"/Camera"} onClick={() => setSelectedSop({ sop: Sops, taskId: +o.id })} > </Link> : <p className={CLASS} >Mark as done</p>}