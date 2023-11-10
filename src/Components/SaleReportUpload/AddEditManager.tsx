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
import { Authorities, Role, SingleManager } from '../../Typings/Manager';
import { useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx'
import { withAlert, withManager, withShop, withUser } from '../../HOC/withProvider';
import { AlertType } from '../../Typings/Alert';
import Loading from '../../Loader/Loading';
import CustomInput from '../../Inventory/CustomInput';
import Dialog from '@mui/material/Dialog';
import CreateRoleForm from './CreateRoleForm';
import RolesMapper from './RolesMapper';

type P = {
    shops: shopObject[];
    config: UserConfig;
    createManager: { config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string } };
    singleManager: SingleManager;
    attachToShopManager: (shopId: number, userId: number, config: UserConfig) => void
    UpdateManager: (
        config: UserConfig, shopId: number, user: {
            name: string;
            email: string;
            password: string;
            type: string;
            username: string
        }
    ) => void;
    user: UserClass;
    setAlert: (a: AlertType) => void;
    role: Role;
    initialRole: { name: string; authorities: Authorities };
    addNew: boolean;
    addRole: (name: string, authorities: Authorities) => void;
    setSelectedShop: (s: Shop) => void;
    selectedShop: Shop;
    attachToShopManager: (shopId: string, userId: string) => void;
}


const AddEditManager: FC<P> = ({ setSingleManager ,setCreatedEmployee , createdEmployee, setSelectedShop, selectedShop, addRole, initialRole, setInitialRole, addNew, setAddNew, roles, shops, config, createManager, singleManager, UpdateManager, user, setAlert, attachToShopManager , detachToShopManager }) => {
    console.log("Single Manager : ", singleManager);
    const FormType = useParams().Form_Type;
    useEffect(()=>{
        if(FormType === "ADD"){
            setSingleManager(undefined);
            setCreatedEmployee(undefined);
        }
    },[])   

    
    const initialValues = FormType !== "ADD" ? {
        name: singleManager?.user.name || "", username: singleManager?.user.username || "", email: singleManager?.user.email || "", password: singleManager?.user.password || "", type: singleManager?.user.role === 2 && "EMPLOYEE" | "", search: "", config: singleManager?.authorities | config,
        shopId: null
    } : {
        name: "", username: "", email: "", password: "", type: "", search: "", config: config,
        shopId: null
    }

    function getRoleId() {
        let id = "";
        roles.forEach((r) => {
            if (r.name === values.type) {
                id = r.id
            }
        })
        return id;
    }
    console.log("Selected Shop : ", selectedShop);




    function submit(values: T, bag: FormikBag<P, T>) {
        if (FormType === "ADD") {
            let id = getRoleId();
            // console.log("Id ", id);
            createManager({ name: values.name, username: values.username, email: values.email, password: values.password, roleId: id })
            bag.resetForm();
        }
        else if (FormType === "Edit") {
            console.log("selectedRole = ",selectedRole);
                let data = {  }
                if(values.name !== singleManager.user.name){
                    data.name = values.name
                }if(values.email !== singleManager.user.email){
                    data.email = values.email

                }if(values.username !== singleManager.user.username){
                    data.username = values.username

                }

                UpdateManager(editConfig, Object.keys(singleManager?.authorities)[0], {roleId : selectedRole.id,...data}, singleManager?.user.id)
                if (changeShop && (changeShop?.id !== Object.keys(selectedShop)[0])) {
                    console.log("changeShop : ", changeShop);

                    attachToShopManager(selectedShop.id, singleManager?.user?.id, editConfig);
                    UpdateManager(editConfig, {roleId : selectedRole.id , name: values.name, username: values.username, email: values.email, password: values.password, type: values.type }, singleManager?.user.id, Object.keys(changeShop)[0])
                }
            
            // else {
            //     setAlert({ message: "Please Select Shop", type: "error" })
            // }

        }
    }

    type T = typeof initialValues;
    const { values, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues,
        onSubmit: submit
    })

    let filteredShop = [] as Shop[]
    
    
    const [changeShop, setChangeShop] = useState<Shop>();
    const [editConfig, setEditConfig] = useState(singleManager?.authorities || undefined);
    const [isConfigVisible, setIsVisileConfig] = useState(false)
    console.log("editConfig : ", editConfig);

    if (values.type === "Add") {
        setAddNew(true);
    }

    if (values.type.length > 0 && editConfig === undefined) {
        roles.forEach((r) => {
            if (r.name === values.type) {
                setEditConfig(r.authorities)
            }
        })
    }

    const [open, setOpen] = useState(true);
    function handleClose() {
        setAddNew(!addNew);
    }
    function handleRole(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log("e : ", e.target.value);
        if (e.target.value === "Add") {
            setAddNew(!addNew);
        }
        else {
            handleChange(e)
            setEditConfig(undefined)
        }

    }

    function shopSelectFunction(e: React.ChangeEvent<HTMLSelectElement>) {
        let shop = {}
        Object.keys(shops).forEach((id) => {
            if (shops[id].store.name === e.target.value) {
                shop = shops[id].store
            }
        })
        setSelectedShop(shop);
    }
    let selectedRole = {}
    if(singleManager){
        selectedRole = roles.filter((role)=>role.id === singleManager.user.roleId)[0]
    }
    console.log("Selected Role ",selectedRole);
    

    return <div className='min-h-[80vh] flex justify-center items-center relative'>
        {/* {FormType?.toUpperCase()} */}
        <div >
            <h1 className=' my-5 text-center '>{FormType?.toUpperCase()} MANAGER</h1>

            <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                <CustomInput type='text' name='name' placeholder="Manager Name" Icon={BsFillPersonFill} value={values.name} onChange={handleChange} />
                <CustomInput type='text' name='username' placeholder='User Name' Icon={BsFillPersonFill} value={values.username} onChange={handleChange} />
                <CustomInput type='email' name='email' placeholder='Email Address' Icon={MdOutlineEmail} value={values.email} onChange={handleChange} />
                <CustomInput type='password' name='password' placeholder='Password' Icon={BiSolidLock} value={values.password} onChange={handleChange} />


                <select name="type" className='px-3 py-2 border rounded-md  '   value={ singleManager ? selectedRole.name : values.type} onChange={handleRole}>
                    <option value={""} className='flex items-center relative' >
                        <BsFillPersonFill size={20} className="absolute left-2 " />
                        <p className='px-10'>Role Type</p>
                    </option>

                    <RolesMapper roles={roles} />
                    <option value={"Add"}>Add New Role</option>
                </select>

                <CreateRoleForm addRole={addRole} addNew={addNew} handleClose={handleClose} initialRole={initialRole} setInitialRole={setInitialRole} />
                <Button type='submit' variant='contained' children={FormType?.toUpperCase() + " MANAGER"} style={{ color: "white" }} sx={{ borderRadius: 0 }} />


                {editConfig &&
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" value={isConfigVisible} onChange={() => setIsVisileConfig(!isConfigVisible)} />
                        <p className='text-sm'>see config</p>
                    </div>
                }
                {
                    (isConfigVisible ) && Object.keys(editConfig).map((option) => {
                        return <div className='gap-2' key={option}>
                            <p className='font-bold text-lg'>{option}</p>
                            {
                                Object.keys(editConfig[option]).map((o) => {
                                    return <div key={o} className=' px-3 flex flex-col my-2 space-y-1'>
                                        <p>{o}</p>
                                        <select value={editConfig[option][o]} className='border p-1 rounded-md' >
                                            <option value={true}>true</option>
                                            <option value={false}>false</option>
                                        </select>
                                    </div>
                                })
                            }

                        </div>
                    })
                }

                { createdEmployee &&
                    (<> <select className='px-10 py-2 rounded-md border border-gray-400 ' >
                        {/* <option value="">Select Employee Type</option> */}
                        <option value="Store Manager">Shop Manager</option>
                    </select>


                        <select className='px-10 py-2 rounded-md border border-gray-400 ' value={selectedShop?.name} onChange={(e) => shopSelectFunction(e)} >
                            <option value="">Select Shop</option>
                            {
                                Object.keys(shops)?.map((id) => {
                                    return <option key={id} value={shops[id].store.name}>{shops[id].store.name}</option>
                                })
                            }
                        </select>

                        <Button variant='contained' children="Attach" disabled={!selectedShop} color='error' onClick={() => attachToShopManager(selectedShop.entityId, createdEmployee)} />
                    </>)
                }

              

                { singleManager?.entity === null && <div>No shop associated</div>  }

                {
                    singleManager?.entity && <div>
                        <p className='font-bold '>Attached Shops</p>
                        <div className='flex justify-between items-center '>
                            <p>{singleManager?.entity.name}</p>
                            <RxCross2 className=" cursor-pointer " onClick={()=>detachToShopManager(singleManager?.entity.id , singleManager?.user.id)} />
                        </div>
                    </div>
                }

            </form>

        </div>

    </div >
}


export default withAlert(withManager(withUser(withShop(AddEditManager))));
