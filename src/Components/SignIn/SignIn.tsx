import { FC } from 'react'
import { MdEmail } from 'react-icons/md'
import Input from '../UI-Components/Input'
import { IoMdLock } from 'react-icons/io'
import { Button } from '@mui/material'
type P = object
const SignIn: FC<P> = () => {
    return <div className="min-h-[80vh] flex items-center justify-center ">
        <div className="w-full p-3 text-center max-w-md mx-auto ">
            <h1 className="font-extrabold text-3xl mb-16"> LOGIN</h1>
            <form action=" " className=" flex flex-col w-full">

                <div className="flex flex-col space-y-4 mb-3 text-[#414141] w-full">
                    <div className=" relative flex items-center  w-full">
                        <MdEmail size={25} className="absolute left-2 " />
                        <Input className="w-full" placeholder="Email Address" />
                    </div>
                    <div className="flex items-center relative w-full">
                        <IoMdLock size={25} className="absolute left-2 " />
                        <Input placeholder="Password" type="password" className="w-full" />
                    </div>
                </div>

                <div className="flex gap-1 items-center text-xs mb-16">
                    <input id="term" type="checkbox" />
                    <label htmlFor="term" >I agree to the <span className="text-blue-400 underline">Term of Service</span> and <span className="text-blue-400 underline"> Privacy Policy</span></label>
                </div>

                <Button variant="contained" children="Submit" sx={{ borderRadius: 0, backgroundColor: "#002CFF" }} className="mt-16 " />

            </form>
        </div>
    </div>
}
export default SignIn;