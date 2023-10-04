// @ts-nocheck
import { FC, useState, useEffect } from 'react'
import Input from '../UI-Components/Input';
import { BsFillPersonFill, BsSearch, BsShop } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'
import { Button } from '@mui/material';
import { FormikBag, FormikProps, useFormik, withFormik } from 'formik';
import { withShop } from '../../HOC/withShop';
import { Shop } from '../../Typings/Shop';
import { withUser } from '../../HOC/withUser';
import { UserConfig } from '../../Typings/User';
import { withManager } from '../../HOC/withManager';
import { SingleManager } from '../../Typings/Manager';
import { useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx'

type P = {
    shops: Shop[];
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
    ) => void
}

const AddEditManager: FC<P> = ({ shops, config, createManager, singleManager, UpdateManager }) => {

    const FormType = useParams().Form_Type;

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
                alert("Please Select Shop")
            }
        }
        else if (FormType === "Edit") {
            console.log("Edit Form ");

            UpdateManager(editConfig, Object.keys(singleManager?.shopAuthorities)[0], { name: values.name, username: values.username, email: values.email, password: values.password, type: values.type }, singleManager?.userDO.id)
        }
    }

    type T = typeof initialValues;
    const { values, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues,
        onSubmit: submit
    })

    let filteredShop = [] as Shop[]
    const oldSelection = singleManager?.shopAuthorities ? { [Object.keys(singleManager?.shopAuthorities)[0][0]]: shops.filter((shop) => shop.id == Object.keys(singleManager?.shopAuthorities)[0])[0] } : null
    const [selectedShop, setSelectedShop] = useState<{ [id: number]: Shop }>(FormType == "ADD" ? {} : oldSelection);
    const [editConfig, setEditConfig] = useState(singleManager ? singleManager.shopAuthorities[3] : config);

    console.log("editConfig ", editConfig);
    console.log("selectedShop ", selectedShop);


    if (values.search.length > 0) {
        filteredShop = shops.filter((shop) => {
            return (Object.keys(selectedShop).length > 0 ? !selectedShop[shop.id] : true) && shop.name.toLowerCase().indexOf(values.search.toLowerCase()) !== -1;
        });
    }

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

                <select name="type" id="" className='px-3 py-2 border rounded-md' value={values.type} onChange={handleChange}>
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
                            return <div onClick={() => { setSelectedShop({ ...selectedShop, [shop.id]: shop }); values.shopId = shop.id }} className=' px-3 flex items-center gap-4  py-1 border rounded-md shadow-md  '>
                                <p><BsShop /></p>
                                <p>{shop.name}</p>
                            </div>
                        })
                    }
                </div>

                <div>
                    {
                        Object.keys(selectedShop).map((id: any) => {
                            return <div className='flex flex-col gap-2'> <h1 className='font-bold'>Selected Shops </h1> <div className='flex items-center justify-between'>
                                <p className='text-sm '> {selectedShop[id].name}</p><RxCross2 className=" cursor-pointer  " onClick={() => setSelectedShop({})} />
                            </div> </div>
                        })
                    }
                </div>

                {
                    (Object.keys(selectedShop).length > 0) && Object.keys(editConfig).map((option) => {
                        return <div className='gap-2'>
                            <p className='font-bold text-lg'>{option}</p>
                            {
                                Object.keys(editConfig[option]).map((o) => {
                                    console.log("values.config[option][o]  ", o);
                                    return <div className=' px-3 flex flex-col my-2 space-y-1'>
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


export default withManager(withUser(withShop(AddEditManager)));