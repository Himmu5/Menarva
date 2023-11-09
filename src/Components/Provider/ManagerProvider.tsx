import { FC, ReactNode, useEffect, useState } from 'react'
import { ManagerContext } from '../../Context/Manager';
import { addManager, addNewRole, attachToShop, detachToShop, editManager, getEmployeeRoles, getManagers, getSingleManagers } from '../../Axios/manager';
import { UserClass, UserConfig } from '../../Typings/User';
import { useNavigate } from 'react-router-dom';
import { Authorities, Manager, Role, SingleManager } from '../../Typings/Manager';
import { AlertType } from '../../Typings/Alert';
import { withAlert, withUser } from '../../HOC/withProvider';
import { defaultAthorities } from '../../Data/DefaultAthorities';
import { Shop } from '../../Typings/Shop';

type P = {
    children: ReactNode;
    user: UserClass;
    setAlert : (s:AlertType)=>void
}

const ManagerProvider: FC<P> = ({ children, user , setAlert }) => {

    const [managers, setManagers] = useState<Manager[]>();
    const [singleManager, setSingleManager] = useState<SingleManager>();
    const [ roles , setRoles ] = useState<Role[]>();
    const [ addNew , setAddNew ] = useState<boolean>(false);
    const [ initialRole , setInitialRole ] = useState({ name : "" , authorities : defaultAthorities });
    const [ createdEmployee , setCreatedEmployee ] = useState<number>();
    const [ selectedShop , setSelectedShop ] = useState<Shop>();
    

    useEffect(() => {

        // addSales()
        if (user?.role === 1) {
            getManager();
            getRoles();
        }
    }, [user])

    function addRole(name :string , authorities :Authorities){
        addNewRole(name , authorities).then((res)=>{
            setAddNew(false);
            setAlert({ message : "Role Added" , type : "success" } );
            setInitialRole({ name : "" , authorities : defaultAthorities });
            getRoles();
        }).catch(()=>{
            setAlert({ message : "Role Not Added" , type : "error" } );
        })
    }

    function getManager() {
        getManagers().then((res) => {
            // console.log("res : ", res);
            setManagers(res.result.employees);
        })
    }
    const navigate = useNavigate()
    function getSingleManager(mId: number) {
        getSingleManagers(mId).then((res) => {
        // console.log("Res : ", res);
            setSingleManager(res.result);
            navigate('/manager/Edit');
        })
    }


    function getRoles(){
        getEmployeeRoles().then((res)=>{
            setRoles(res.result);
        }).catch(()=>{
            setAlert({ message : "Error in getting Roles" , type : "error" } );
        })
    }

    function createManager(user: { name: string; email: string; password: string; type: string , roleId : string }) {
        addManager(user).then((res) => {
            console.log("Res : ",res);

            // navigate("/manager")
            setCreatedEmployee(res.result.userId)
            setAlert({ message : res.message , type : "success" } );
        }).catch((err) => {
            setAlert({ message : err.message , type : "error" } );
        })
    }

    function UpdateManager(config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string }, mId: number , detacheShopId ?: number) {
        editManager(config, shopId, user, mId , detacheShopId).then((res) => {
            // console.log("Res : ",res.data.message);
            navigate("/manager")
            setAlert({ message : res.message , type : "success" } );
        }).catch((err) => {
            setAlert({ message : err.message , type : "error" } );
        })
    }

    function attachToShopManager(shopId: number, userId: number){
        attachToShop(shopId , userId ).then((res)=>{
            setCreatedEmployee(undefined);
            setSelectedShop(undefined);
            navigate("/manager")
            setAlert({ message : res.message , type : "success" } );
        }).catch((err)=>{
            setAlert({ message : err.message , type : "error" } );
        }) 
    }
    function detachToShopManager(shopId: number, userId: number){
        detachToShop(shopId , userId ).then((res)=>{
            setCreatedEmployee(undefined);
            setSelectedShop(undefined);
            navigate("/manager")
            setAlert({ message : res.message , type : "success" } );
        }).catch((err)=>{
            setAlert({ message : err.message , type : "error" } );
        }) 
    }

    // function attachToShop(){

    // }



    return <ManagerContext.Provider value={{ detachToShopManager , createdEmployee , setSelectedShop, selectedShop , addRole , initialRole , setInitialRole , setAddNew ,addNew ,roles ,UpdateManager,attachToShopManager , getManager, managers, createManager, getSingleManager, singleManager }} >
        {children}
    </ManagerContext.Provider>
}
export default withAlert(withUser(ManagerProvider));