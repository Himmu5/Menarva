import { FC, ReactNode, useEffect, useState } from 'react'
import { ManagerContext } from '../../Context/Manager';
import { addManager, attachToShop, editManager, getManagers, getSingleManagers } from '../../Axios/manager';
import { UserClass, UserConfig } from '../../Typings/User';
import { useNavigate } from 'react-router-dom';
import { Manager, SingleManager } from '../../Typings/Manager';
import { AlertType } from '../../Typings/Alert';
import { withAlert, withUser } from '../../HOC/withProvider';

type P = {
    children: ReactNode;
    user: UserClass;
    setAlert : (s:AlertType)=>void
}

const ManagerProvider: FC<P> = ({ children, user , setAlert }) => {

    const [managers, setManagers] = useState<Manager[]>();
    const [singleManager, setSingleManager] = useState<SingleManager>();

    useEffect(() => {
        // addSales()
        if (user?.role === 1) {
            getManager();
        }
    }, [user])

    function getManager() {
        getManagers().then((res) => {
            // console.log("res : ", res);
            setManagers(res.result);
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

    function createManager(config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string }) {
        addManager(config, shopId, user).then((res) => {
            // console.log("Res : ",res.data.message);
            navigate("/mannager")
            setAlert({ message : res.message , type : "success" } );
        }).catch((err) => {
            setAlert({ message : err.message , type : "error" } );
        })
    }

    function UpdateManager(config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string }, mId: number , detacheShopId ?: number) {
        editManager(config, shopId, user, mId , detacheShopId).then((res) => {
            // console.log("Res : ",res.data.message);
            navigate("/mannager")
            setAlert({ message : res.message , type : "success" } );
        }).catch((err) => {
            setAlert({ message : err.message , type : "error" } );
        })
    }

    function attachToShopManager(shopId: number, userId: number, config: UserConfig){
        attachToShop(shopId , userId , config).then((res)=>{
            navigate("/mannager")
            setAlert({ message : res.message , type : "success" } );
        }).catch((err)=>{
            setAlert({ message : err.message , type : "error" } );
        }) 
    }



    return <ManagerContext.Provider value={{ UpdateManager,attachToShopManager , getManager, managers, createManager, getSingleManager, singleManager }} >
        {children}
    </ManagerContext.Provider>
}
export default withAlert(withUser(ManagerProvider));