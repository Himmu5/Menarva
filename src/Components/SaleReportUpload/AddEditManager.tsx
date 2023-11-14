// @ts-nocheck
import { FC, useState, useEffect } from 'react'
import { BsFillPersonFill, BsSearch, BsShop } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'
import { Button } from '@mui/material';
import { FormikBag, useFormik } from 'formik';
import { Shop, shopObject } from '../../Typings/Shop';
import { UserClass, UserConfig } from '../../Typings/User';
import { Authorities, Role, SingleManager } from '../../Typings/Manager';
import { useNavigate, useParams } from 'react-router-dom';
import { withAlert, withManager, withShop, withUser } from '../../HOC/withProvider';
import { AlertType } from '../../Typings/Alert';
import CustomInput from '../../Inventory/CustomInput';
import CreateRoleForm from './CreateRoleForm';
import RolesMapper from './RolesMapper';
import ShowEntity from './ShowEntity';
import BackButton from '../UI-Components/BackButton';

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
    setSelectedRoleName: (s: string) => void;
    selectedRoleTemplate: Role
}


const AddEditManager: FC<P> = ({ selectedRoleTemplate, setSelectedRoleName, setSingleManager, setCreatedEmployee, createdEmployee, setSelectedShop, selectedShop, addRole, initialRole, setInitialRole, addNew, setAddNew, roles, shops, config, createManager, singleManager, UpdateManager, user, setAlert, attachToShopManager, detachToShopManager }) => {

    const FormType = useParams().Form_Type;
    useEffect(() => {
        if (FormType === "ADD") {
            setSingleManager(undefined);
            setCreatedEmployee(undefined);
        }
    }, [])


    const initialValues = FormType !== "ADD" ? {
        name: singleManager?.user.name || "", username: singleManager?.user.username || "", email: singleManager?.user.email || "", password: singleManager?.user.password || "", type: singleManager?.user.role === 2 && "EMPLOYEE" | "", search: "", config: singleManager?.authorities | config
    } : {
        name: "", username: "", email: "", password: "", type: "", search: "", config: config
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

    function submit(values: T, bag: FormikBag<P, T>) {
        if (FormType === "ADD") {
            let id = getRoleId();
            createManager({ name: values.name, username: values.username, email: values.email, password: values.password, roleId: id })

        }
        else if (FormType === "Edit") {
            console.log("selectedRole = ", selectedRole);
            let id = getRoleId();
            let data = {}
            if (values.name !== singleManager.user.name) {
                data.name = values.name
            } if (values.email !== singleManager.user.email) {
                data.email = values.email
            } if (values.username !== singleManager.user.username) {
                data.username = values.username
            }if (values.password.length !== 0) {
                data.username = values.username
            }

            UpdateManager(editConfig, Object.keys(singleManager?.authorities)[0], { roleId: id, ...data }, singleManager?.user.id)
            // if (changeShop && (changeShop?.id !== Object.keys(selectedShop)[0])) {
            //     console.log("changeShop : ", changeShop);

            //     attachToShopManager(selectedShop.id, singleManager?.user?.id, editConfig);
            //     UpdateManager(editConfig, { roleId: selectedRole.id, name: values.name, username: values.username, email: values.email, password: values.password, type: values.type }, singleManager?.user.id, Object.keys(changeShop)[0])
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


    function handleClose() {
        setAddNew(!addNew);
    }

    function handleRole(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "Add") {
            setAddNew(!addNew);
        }
        else {
            setSelectedRoleName(e.target.value);
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
    if (singleManager) {
        selectedRole = roles.filter((role) => role.id === singleManager.user.roleId)[0]
    }
    const Navigate = useNavigate()


    return <div className=' max-w-4xl mx-auto ' >
        <div onClick={() => Navigate(-1)}><BackButton /></div>
        <div className='min-h-[80vh] flex justify-center items-center relative'>

            <div >
                <h1 className=' my-5 text-center '>{FormType?.toUpperCase()} MANAGER</h1>

                <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                    <CustomInput type='text' name='name' placeholder="Manager Name" Icon={BsFillPersonFill} value={values.name} onChange={handleChange} />
                    <CustomInput type='text' name='username' placeholder='User Name' Icon={BsFillPersonFill} value={values.username} onChange={handleChange} />
                    <CustomInput type='email' name='email' placeholder='Email Address' Icon={MdOutlineEmail} value={values.email} onChange={handleChange} />
                    <CustomInput type='password' name='password' placeholder='Password' Icon={BiSolidLock} value={values.password} onChange={handleChange} />


                    <select name="type" className='px-3 py-2 border rounded-md  ' value={values.type} onChange={handleRole}>
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
                            <p className='text-sm'>See Authorities</p>
                        </div>
                    }
                    {
                        (isConfigVisible) && Object.keys(editConfig).map((option) => {
                            return <div className='gap-2' key={option}>
                                <p className='font-bold text-lg'>{option}</p>
                                {
                                    Object.keys(editConfig[option]).map((o) => {
                                        // console.log("editConfig[option][o] :",editConfig[option][o]);

                                        return <div key={o} className=' px-3 flex items-center text-sm gap-2 space-y-1'>
                                            <input type="checkbox" checked={editConfig[option][o]} value={editConfig[option][o]} />
                                            <p>{o}</p>
                                        </div>
                                    })
                                }

                            </div>
                        })
                    }

                    {createdEmployee &&
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

                    <ShowEntity detachToShopManager={detachToShopManager} singleManager={singleManager} />

                </form>

            </div>

        </div >
    </div>
}


export default withAlert(withManager(withUser(withShop(AddEditManager))));
