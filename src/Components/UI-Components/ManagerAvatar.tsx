import { FC, useState } from 'react'
import { Manager } from '../../Typings/Manager';
type P = {
    Managers : Manager[]
}
const Avatar: FC<P> = ({ Managers }) => {

    const [show, setShow] = useState(false);

    return <div>
        <div className="flex -space-x-4 justify-center">
            {
                Managers.map((Person, index) => {
                    return index < 3 && <div key={Math.random()}>
                        <p className='rounded-full bg-gray-500 text-white h-4 w-4 '>{Person.name.charAt(0)}</p>
                        {/* <img  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={" "} alt="" /> */}
                    </div>
                })
            }

            {
                show && <div className='flex flex-col gap-3 w-40 h-56 overflow-auto  scrollbar  absolute bg-black bg-opacity-90 text-white p-4 rounded-md -ml-10 mt-10 '>
                    {
                        Managers.map((Person) => {
                            return <div key={Person.id} onClick={() => setShow(!show)} className="text-xs flex gap-4 items-center "> <img className="w-7 h-7 border-2 border-white rounded-full dark:border-gray-800" src={""} alt="" /> <p>{Person.name}</p></div>
                        })
                    }
                </div>
            }


            {
                Managers.length > 3 && <button className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" onClick={() => setShow(!show)} >+{Managers.length - 3}</button>
            }


        </div>

    </div>
}


export default Avatar;