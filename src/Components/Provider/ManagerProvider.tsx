import { FC, ReactNode, useEffect, useState } from 'react'
import { ManagerContext } from '../../Context/Manager';
import { addManager, addNewRole, attachToShop, detachToShop, editManager, getEmployeeRoles, getManagers, getRoleTemplate, getSingleManagers } from '../../Axios/manager';
import { UserClass, UserConfig } from '../../Typings/User';
import { useNavigate, useParams } from 'react-router-dom';
import { Authorities, Manager, Role, SingleManager } from '../../Typings/Manager';
import { AlertType } from '../../Typings/Alert';
import { withAlert, withUser } from '../../HOC/withProvider';
import { defaultAthorities } from '../../Data/DefaultAthorities';
import { Shop } from '../../Typings/Shop';

type P = {
    children: ReactNode;
    user: UserClass;
    setAlert: (s: AlertType) => void;
    accessToken: string
}

const ManagerProvider: FC<P> = ({ children, user, setAlert, accessToken }) => {

    const [managers, setManagers] = useState<{ employees: Manager[] }>();
    const [singleManager, setSingleManager] = useState<SingleManager>();
    const [roles, setRoles] = useState<Role[]>();
    const [addNew, setAddNew] = useState<boolean>(false);
    const [initialRole, setInitialRole] = useState({ name: "", authorities: defaultAthorities });
    const [createdEmployee, setCreatedEmployee] = useState<number>();
    const [selectedShop, setSelectedShop] = useState<Shop>();
    const [selectedRoleName, setSelectedRoleName] = useState<string>();
    const [selectedRoleTemplate, setSelectedRoleTemplate] = useState<Role>();
    console.log("Role Template : ", selectedRoleTemplate);
    useEffect(() => {
        if (user?.role === 1) {
            getManager(accessToken);
            getRoles();
        }
    }, [user])


    useEffect(() => {
        if (user?.role === 1) {
            getRoleTemplate(accessToken).then((res) => {
                setSelectedRoleTemplate(res.result);
            })
        }
    }, [selectedRoleName])

    function addRole(name: string, authorities: Authorities) {
        if (name.length !== 0 && authorities) {
            addNewRole(name, authorities, accessToken).then((res) => {
                setAddNew(false);
                setAlert({ message: "Role Added", type: "success" });
                setInitialRole({ name: "", authorities: defaultAthorities });
                getRoles();
            }).catch(() => {
                setAlert({ message: "Role Not Added", type: "error" });
            })
        } else {
            setAlert({ message: "please fill the form currectly", type: "error" });
        }
    }

    function getManager(accessToken: string) {
        getManagers(accessToken).then((res) => {
            // console.log("res : ", res);
            setManagers(res.result.employees);
        })
    }
    const navigate = useNavigate()
    function getSingleManager(mId: number, redirect?: boolean) {
        getSingleManagers(mId, accessToken).then((res) => {
            // console.log("Res : ", res.result.user.id);
            setCreatedEmployee(res.result.user.id);
            setSingleManager(res.result);
            if (redirect !== false) {
                navigate('/manager/Edit');
            }
        })
    }


    function getRoles() {
        getEmployeeRoles(accessToken).then((res) => {
            setRoles(res.result);
        }).catch(() => {
            setAlert({ message: "Error in getting Roles", type: "error" });
        })
    }

    function createManager(user: { name: string; email: string; password: string; type: string, roleId: string }) {
        addManager(user, accessToken).then((res) => {
            // JSON.parse(res);
            const result = res.result;
            // Parse the JSON string into a JavaScript object
            var resultObject = JSON.parse(result);
            // Access the userId property
            var userId = resultObject.userId;

            setCreatedEmployee(userId)
            setAlert({ message: res.message, type: "success" });
        }).catch((err) => {
            console.log("error : ", err)
            setAlert({ message: err.message, type: "error" });
        })
    }

    function UpdateManager(config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string }, mId: number, detacheShopId?: number) {
        editManager(config, shopId, user, mId, detacheShopId).then((res) => {
            // console.log("Res : ",res.data.message);
            navigate("/manager")
            setAlert({ message: res.message, type: "success" });
        }).catch((err) => {
            setAlert({ message: err.message, type: "error" });
        })
    }

    function attachToShopManager(shopId: number, userId: number) {
        attachToShop(shopId, userId, accessToken).then((res) => {
            setCreatedEmployee(undefined);
            setSelectedShop(undefined);
            getSingleManager(userId, false);
            // navigate("/manager")
            setAlert({ message: res.message, type: "success" });
        }).catch((err) => {
            setAlert({ message: err.message, type: "error" });
        })
    }
    function detachToShopManager(shopId: number, userId: number) {
        detachToShop(shopId, userId, accessToken).then((res) => {
            setCreatedEmployee(undefined);
            setCreatedEmployee(undefined);
            setSelectedShop(undefined);
            setSelectedShop(undefined);
            getSingleManager(userId, false);
            // navigate("/manager")
            setAlert({ message: res.message, type: "success" });
        }).catch((err) => {
            setAlert({ message: err.message, type: "error" });
        })
    }



    return <ManagerContext.Provider value={{ selectedRoleTemplate, setSelectedRoleName, setSingleManager, setCreatedEmployee, detachToShopManager, createdEmployee, setSelectedShop, selectedShop, addRole, initialRole, setInitialRole, setAddNew, addNew, roles, UpdateManager, attachToShopManager, getManager, managers, createManager, getSingleManager, singleManager }} >
        {children}
    </ManagerContext.Provider>
}
export default withAlert(withUser(ManagerProvider));