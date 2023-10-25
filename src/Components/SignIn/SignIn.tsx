import { FC } from 'react'
import { MdEmail } from 'react-icons/md'
import Input from '../UI-Components/Input'
import { IoMdLock } from 'react-icons/io'
import { Button } from '@mui/material'
import { withAlert, withUser } from '../../HOC/withProvider'
import { FormikBag, FormikProps, withFormik } from 'formik'
import { AlertType } from '../../Typings/Alert'
type P = {
    AuthUser: (values: { username: string, password: string }) => void;
    setAlert : (a:AlertType)=>void;
} & FormikProps<FormValues>

const SignIn: FC<P> = ({ values, handleChange, handleSubmit }) => {
    console.log("values ", values);

    return <div className="min-h-[80vh] flex items-center justify-center ">
        <div className="w-full p-3 text-center max-w-md mx-auto ">
            <h1 className="font-extrabold text-3xl mb-16"> LOGIN</h1>
            <form className=" flex flex-col w-full" onSubmit={handleSubmit}>

                <div className="flex flex-col space-y-4 mb-3 text-[#414141] w-full">
                    <div className=" relative flex items-center  w-full">
                        <MdEmail size={25} className="absolute left-2 " />
                        <Input className="w-full" name={'username'} value={values.username} onChange={handleChange} placeholder="Email Address" />
                    </div>
                    <div className="flex items-center relative w-full">
                        <IoMdLock size={25} className="absolute left-2 " />
                        <Input placeholder="Password" name={'password'} type="password" value={values.password} onChange={handleChange} className="w-full" />
                    </div>
                </div>

                <div className="flex gap-1 items-center text-xs mb-16">
                    <input id="term" name='checkbox' type="checkbox" value={values.checkbox} onChange={handleChange} />
                    <label htmlFor="term" >I agree to the <span className="text-blue-400 underline">Term of Service</span> and <span className="text-blue-400 underline"> Privacy Policy</span></label>
                </div>

                <Button variant="contained" type='submit' children="Submit" sx={{ borderRadius: 0, backgroundColor: "#002CFF" }} className="mt-16 " />

            </form>
        </div>
    </div>
}

const initialValues = {
    username: "",
    password: "",
    checkbox: "",
}

type FormValues = typeof initialValues;

function submit(values: FormValues, bag: FormikBag<P, FormValues>) {
    if (values.checkbox) {
        console.log(values, "  ", bag);
        bag.props.AuthUser(values);
    }else{
        bag.props.setAlert({ type : "error" , message : "Please accept term and conditions"  })
    }

}

const HOC = withFormik({
    mapPropsToValues: () => initialValues,
    handleSubmit: submit,
})

export default withAlert(withUser(HOC(SignIn)));