// @ts-nocheck
import { FC, useState, useEffect } from 'react'
import Input from '../UI-Components/Input';
import { BsFillPersonFill, BsSearch, BsShop } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'
import { Button } from '@mui/material';
import { FormikBag, FormikProps, useFormik, withFormik } from 'formik';
import { Shop, shopObject } from '../../Typings/Shop';
import { UserClass, UserConfig } from '../../Typings/User';
import { SingleManager } from '../../Typings/Manager';
import { useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx'
import { withAlert, withManager, withShop, withUser } from '../../HOC/withProvider';
import { AlertType } from '../../Typings/Alert';

type P = {
    shops: shopObject;
    config: UserConfig;
    createManager: { config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string } };
    singleManager: SingleManager;
    UpdateManager: (
        config: UserConfig, shopId: number, user: {
            name: string;
            email: string;
            password: string;
            type: string;
            username: string
        }
    ) => void;
    user:UserClass;
    setAlert : (a:AlertType)=>void
}

const AddEditManager: FC<P> = ({ shops, config, createManager, singleManager, UpdateManager , user , setAlert}) => {

    const FormType = useParams().Form_Type;
    // console.log("shops : ",shops);

    const initialValues = FormType !== "ADD" ? {
        name: singleManager?.userDO.name || "", username: singleManager?.userDO.username || "", email: singleManager?.userDO.email || "", password: singleManager?.userDO.password || "", type: "", search: "", config: singleManager?.shopAuthorities[3] | config,
        shopId: null
    } : {
        name: "", username: "", email: "", password: "", type: "", search: "", config: config,
        shopId: null
    }


    function submit(values: T, bag: FormikBag<P, T>) {
        if (FormType === "ADD") {
            if (Object.keys(selectedShop).length > 0) {
                console.log("values  : ", values);
                createManager(editConfig, Object.keys(selectedShop)[0], { name: values.name, username: values.username, email: values.email, password: values.password })
                bag.resetForm();
            }
            else {
                setAlert({message :"Please Select Shop" , type:"error" })
            }
        }
        else if (FormType === "Edit") {
            if (Object.keys(selectedShop).length > 0) {
            UpdateManager(editConfig, Object.keys(singleManager?.shopAuthorities)[0], { name: values.name, username: values.username, email: values.email, password: values.password, type: values.type }, singleManager?.userDO.id)
            }
            else {
                setAlert({message :"Please Select Shop" , type:"error" })
            }
        }
    }

    type T = typeof initialValues;
    const { values, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues,
        onSubmit: submit
    })

    let filteredShop = [] as Shop[]
    
    const oldSelection = singleManager?.shopAuthorities ? { [Object.keys(singleManager?.shopAuthorities)[0][0]] : shops[Object.keys(singleManager?.shopAuthorities)[0][0]].store  } : null
    const [selectedShop, setSelectedShop] = useState<{ [id: number]: Shop }>(FormType == "ADD" ? {} : oldSelection);
    const [editConfig, setEditConfig] = useState(singleManager ? singleManager.shopAuthorities[3] : config);

    // console.log("shops  : ",shops);
    

    if (values.search.length > 0) {
        const stores = Object.keys(shops).map((key)=>{
            return shops[key].store
        })
        filteredShop = stores.filter((shop) => {
            // console.log("Shop :",shops);
            
            return (Object.keys(selectedShop).length > 0 ? !selectedShop[shop.id] : true) && shop.name.toLowerCase().indexOf(values.search.toLowerCase()) !== -1;
        });
    }
    // console.log("Filter : ",filteredShop);
    

    function change(e, option, o) {
        values.config[option][o] = e.target.value
    }
    useEffect(() => {
        if (FormType === "Add") {
            setSelectedShop({})
        }
        return () => {
            resetForm();
        }
    }, [])

    return <div className='min-h-[80vh] flex justify-center items-center '>
        {/* {FormType?.toUpperCase()} */}
        <div >
            <h1 className=' my-5 text-center '>{FormType?.toUpperCase()} MANAGER</h1>

            <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                <div className='flex items-center relative'>
                    <BsFillPersonFill size={20} className="absolute left-2 " />
                    <Input type='' name='name' placeholder='Manager Name' value={values.name} onChange={handleChange} />
                </div>
                <div className='flex items-center relative'>
                    <BsFillPersonFill size={20} className="absolute left-2 " />
                    <Input type='' name='username' placeholder='User Name' value={values.username} onChange={handleChange} />
                </div>
                <div className='flex items-center relative'>
                    <MdOutlineEmail size={20} className="absolute left-2 " />
                    <Input type='' name='email' placeholder='Email Address' value={values.email} onChange={handleChange} />
                </div>
                <div className='flex items-center relative'>
                    <BiSolidLock size={20} className="absolute left-2 " />
                    <Input type='password' name='password' placeholder='Password' value={values.password} onChange={handleChange} />
                </div>

                <select name="type" className='px-3 py-2 border rounded-md' value={"Store Manager"} onChange={handleChange}>
                    <option className='flex items-center relative' >
                        <BsFillPersonFill size={20} className="absolute left-2 " />
                        <p className='px-10'>Manager Type</p>
                    </option>
                    <option value={"Store Manager"}>Store Manager</option>
                    <option value="Warehouse Manager">Warehouse Manager</option>
                </select>


                {
                    values.type.length > 0 &&
                    <div className='flex items-center relative'>
                        <BsSearch size={20} className="absolute left-2 " />
                        <Input type='text' name='search' placeholder={`Search ${values.type.split(" ")[0]}`} value={values.search} onChange={handleChange} />
                    </div>

                }
                <div className='space-y-1'>
                    {
                        Object.keys(selectedShop).length < 1 && filteredShop.map((shop) => {
                            return <div key={shop.id} onClick={() => { setSelectedShop({ ...selectedShop, [shop.id]: shop }); values.shopId = shop.id }} className=' px-3 flex items-center gap-4  py-1 border rounded-md shadow-md  '>
                                <p><BsShop /></p>
                                <p>{shop.name}</p>
                            </div>
                        })
                    }
                </div>

                <div>
                    {
                        Object.keys(selectedShop).map((id: any) => {
                            return <div key={id} className='flex flex-col gap-2'> <h1 className='font-bold'>Selected Shops </h1> <div className='flex items-center justify-between'>
                                <p className='text-sm '> {selectedShop[id].name}</p><RxCross2 className=" cursor-pointer  " onClick={() => setSelectedShop({})} />
                            </div> </div>
                        })
                    }
                </div>

                {
                    (Object.keys(selectedShop).length > 0) && Object.keys(editConfig).map((option) => {
                        return <div className='gap-2' key={option}>
                            <p className='font-bold text-lg'>{option}</p>
                            {
                                Object.keys(editConfig[option]).map((o) => {
                                    return <div key={o} className=' px-3 flex flex-col my-2 space-y-1'>
                                        <p>{o}</p>
                                        <select value={editConfig[option][o]} onChange={(e) => setEditConfig({ ...editConfig, [option]: { ...editConfig[option], [o]: e.target.value } })} className='border p-1 rounded-md' >
                                            <option value={true}>true</option>
                                            <option value={false}>false</option>
                                        </select>
                                    </div>
                                })
                            }

                        </div>
                    })
                }


                <Button type='submit' variant='contained' children={FormType?.toUpperCase() + " MANAGER"} style={{ color: "white" }} sx={{ borderRadius: 0 }} />

            </form>

        </div>

    </div>
}


export default withAlert(withManager(withUser(withShop(AddEditManager))));