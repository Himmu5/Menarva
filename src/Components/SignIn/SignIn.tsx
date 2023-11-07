import { FC } from 'react'
import { MdEmail } from 'react-icons/md'
import Input from '../UI-Components/Input'
import { IoMdLock } from 'react-icons/io'
import { Button } from '@mui/material'
import { withAlert, withUser } from '../../HOC/withProvider'
import { FormikBag, FormikProps, withFormik } from 'formik'
import { AlertType } from '../../Typings/Alert'
import { FormImage } from '../../../public'

type P = {
    AuthUser: (values: { username: string, password: string }) => void;
    setAlert: (a: AlertType) => void;
} & FormikProps<FormValues>

// const useStyles : any 
// = makeStyles(() => ({
//     customButton: {
//         backgroundColor: '#8F5843',
//         color: 'white',
//         '&:hover': {
//             backgroundColor: '#8F5843', // Darker color on hover
//         },
//     },
// }));



const SignIn: FC<P> = ({ values, handleChange, handleSubmit }) => {

    return <div className="min-h-[80vh] flex items-center justify-center ">
        <div className="w-full p-3 text-center max-w-md mx-auto flex flex-col items-center ">
            <h1 className="font-extrabold text-3xl "> LOGIN</h1>
            <img src={FormImage} alt='Form Image' />
            <form className=" flex flex-col w-full" onSubmit={handleSubmit}>

                <div className="flex flex-col space-y-4 mb-3 text-primary w-full">
                    <div className=" relative flex items-center  w-full">
                        <MdEmail size={25} className="absolute left-2 " />
                        <Input className="w-full" name={'username'} value={values.username} onChange={handleChange} placeholder="Email Address" />
                    </div>
                    <div className="flex items-center relative w-full">
                        <IoMdLock size={25} className="absolute left-2 " />
                        <Input placeholder="Password" name={'password'} type="password" value={values.password} onChange={handleChange} className="w-full" />
                    </div>
                </div>

                <div className="flex gap-1 items-center text-xs mb-10">
                    <input id="term" name='checkbox' type="checkbox" value={values.checkbox} onChange={handleChange} />
                    <label htmlFor="term" >I agree to the <span className="text-blue-400 underline">Term of Service</span> and <span className="text-blue-400 underline"> Privacy Policy</span></label>
                </div>
                <div className='px-4 flex flex-col '>
                    <Button variant="contained" color='primary' type='submit' children="Submit" className={"mt-16 "} sx={{ backgroundColor : "#8F5843" , borderRadius : 15 }} />
                </div>

                <div className='flex justify-between items-center my-5'>
                    <p></p>
                    <p className='text-xs text-primary underline'>Forgot Password?</p>
                </div>

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
        bag.props.AuthUser(values);
    } else {
        bag.props.setAlert({ type: "error", message: "Please accept term and conditions" })
    }

}

const HOC = withFormik({
    mapPropsToValues: () => initialValues,
    handleSubmit: submit,
})

export default withAlert(withUser(HOC(SignIn)));

