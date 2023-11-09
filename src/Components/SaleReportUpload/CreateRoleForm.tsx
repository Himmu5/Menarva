import { FC, ChangeEvent } from 'react';
import { Button, Dialog } from '@mui/material';
import CustomInput from '../../Inventory/CustomInput';
import { RxCross2 } from 'react-icons/rx';
import { Authorities, Role } from '../../Typings/Manager';
import { BsFillPersonFill } from 'react-icons/bs';

type P = {
    addNew: boolean;
    handleClose: () => void;
    initialRole: Role;
    setInitialRole: (r: Role) => void;
    addRole: (name: string, authorities: Authorities) => void; // Add proper type for addRole
};

const CreateRoleForm: FC<P> = ({ addNew, handleClose, initialRole, setInitialRole, addRole }) => {
    return (
        <div>
            <Dialog open={addNew} onClose={handleClose} maxWidth='lg' sx={{ padding: 2 }}>
                <form className='p-4 flex flex-col gap-3'>
                    <div className='flex items-center justify-between'>
                        <p>Add a new role</p>
                        <p onClick={handleClose}><RxCross2 size={25} /></p>
                    </div>
                    <CustomInput
                        type='text'
                        name='role'
                        placeholder='Role Name'
                        Icon={BsFillPersonFill}
                        value={initialRole.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setInitialRole({ ...initialRole, name: e.target.value });
                        }}
                    />
                    {Object.keys(initialRole.authorities).map((option) => (
                        <div className='gap-2' key={option}>
                            <p className='font-bold text-lg'>{option}</p>
                            {Object.keys(initialRole.authorities[option as keyof Authorities]).map((o) => (
                                <div key={o} className=' px-3 flex flex-col my-2 space-y-1'>
                                    <p>{o}</p>
                                    <select
                                        // @ts-ignore
                                        value={initialRole.authorities[option][o as any]}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                            setInitialRole({
                                                ...initialRole,
                                                authorities: {
                                                    ...initialRole.authorities,
                                                    [option]: {
                                                        ...initialRole.authorities[option as keyof Authorities],
                                                        [o]: e.target.value === 'true',
                                                    },
                                                },
                                            })
                                        }
                                        className='border p-1 rounded-md'
                                    >
                                        <option value='true'>true</option>
                                        <option value='false'>false</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className='flex items-center gap-2'>
                        <Button variant='outlined' onClick={handleClose} children='Cancel' />
                        <Button variant='contained' onClick={() => addRole(initialRole.name, initialRole.authorities)} children='Add Role' />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default CreateRoleForm;
