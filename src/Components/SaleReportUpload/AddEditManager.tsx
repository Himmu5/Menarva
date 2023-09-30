// @ts-nocheck
import { FC, useState } from 'react'
import Input from '../UI-Components/Input';
import { BsFillPersonFill, BsSearch } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'
import { Button } from '@mui/material';
import { FormikBag, FormikProps, withFormik } from 'formik';
import { withShop } from '../../HOC/withShop';
import { Shop } from '../../Typings/Shop';
import { withUser } from '../../HOC/withUser';
import { UserConfig } from '../../Typings/User';
import { withManager } from '../../HOC/withManager';

type P = {
    shops: Shop[];
    config: UserConfig;
    createManager: { config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string } }
} & FormikProps<T>

const AddEditManager: FC<P> = ({ values, handleChange, handleSubmit, shops, config }) => {

    let filteredShop = [] as Shop[]
    const [selectedShop, setSelectedShop] = useState<{ [id: number]: Shop }>({});
    const [editConfig, setEditConfig] = useState(config);
    console.log("editConfig ", editConfig);
    console.log("filteredShop ", filteredShop);


    if (values.search.length > 0) {
        filteredShop = shops.filter((shop) => {
            return (Object.keys(selectedShop).length > 0 ? !selectedShop[shop.id] : true) && shop.name.toLowerCase().indexOf(values.search.toLowerCase()) !== -1;
        });
    }

    function change(e, option, o) {
        console.log("e : ", e.target.value);
        values.config[option][o] = !values.config[option][o]
    }

    console.log("values.config[option][o]  :", values.config);

    return <div className='min-h-[80vh] flex justify-center items-center '>

        <div >
            <h1 className=' my-5 text-center '>ADD MANAGER</h1>

            <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                <div className='flex items-center relative'>
                    <BsFillPersonFill size={20} className="absolute left-2 " />
                    <Input type='' name='name' placeholder='Manager Name' value={values.name} onChange={handleChange} />
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
                            return <div onClick={() => { setSelectedShop({ ...selectedShop, [shop.id]: shop }); values.shopId = shop.id }} className=' px-3 py-1 border rounded-md shadow-md  '>{shop.name}</div>
                        })
                    }
                </div>

                <div>
                    {
                        Object.keys(selectedShop).map((id: any) => {
                            return <div className='flex flex-col gap-2'> <h1 className='font-bold'>Selected Shops </h1> <p className='text-sm '> {selectedShop[id].name}</p></div>
                        })
                    }
                </div>

                {
                    Object.keys(selectedShop).length > 0 && Object.keys(values.config).map((option) => {
                        return <div className='gap-2'>
                            <p className='font-bold text-lg'>{option}</p>
                            {
                                Object.keys(values.config[option]).map((o) => {
                                    console.log("values.config[option][o]  ", o);
                                    return <div className=' px-3 flex flex-col my-2 space-y-1'>
                                        <p>{o}</p>
                                        <select value={values.config[option][o]} onChange={(e) => change(e, option, o)} className='border p-1 rounded-md' >
                                            <option value="True">true</option>
                                            <option value="False">false</option>
                                        </select>
                                    </div>
                                })
                            }

                        </div>
                    })
                }


                <Button type='submit' variant='contained' children="CREATE MANAGER" style={{ color: "white" }} sx={{ borderRadius: 0 }} />

            </form>

        </div>

    </div>
}

const initialValues = {
    name: "", email: "", password: "", type: "", search: "", config: {
        ACCOUNTING: {
            "READ": false,
            "WRITE": false,
            "UPDATE": false,
            "DELETE": false
        }, MANAGER: {
            "READ": false,
            "WRITE": false,
            "UPDATE": false,
            "DELETE": false
        }, SHOP: {
            "READ": false,
            "WRITE": false,
            "UPDATE": false,
            "DELETE": false
        }
    },
    shopId: 0
}

type T = typeof initialValues;

function submit(values: T, bag: FormikBag<P, T>) {
    console.log("bag : ", bag);
    bag.props.createManager(values.config, values.shopId, { name: values.name, email: values.email, password: values.password })
}

const hoc = withFormik({
    mapPropsToValues: () => (initialValues),
    handleSubmit: submit
})

export default withManager(withUser(hoc(withShop(AddEditManager))));