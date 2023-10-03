import { FC, ReactNode, useEffect, useState } from 'react'
import { ManagerContext } from '../../Context/Manager';
import { addManager, editManager, getManagers, getSingleManagers } from '../../Axios/manager';
import { UserClass, UserConfig } from '../../Typings/User';
import { Navigate, useNavigate } from 'react-router-dom';
import { Manager, SingleManager } from '../../Typings/Manager';
import { withUser } from '../../HOC/withUser';

type P = {
    children: ReactNode;
    user: UserClass
}

const ManagerProvider: FC<P> = ({ children, user }) => {

    const [managers, setManagers] = useState<Manager[]>();
    const [  singleManager , setSingleManager ] = useState<SingleManager>();

    useEffect(() => {
        // addSales()
        getManager();
    }, [user])

    function getManager(){
        getManagers().then((res) => {
            console.log("res : ", res);
            setManagers(res.result);
        })
    }
    const navigate =useNavigate()
    function getSingleManager(mId: number) {
        getSingleManagers(mId).then((res) => {
            // console.log("Res : ", res);
            setSingleManager(res.result);
            navigate('/mannager/edit/Edit');
        })
    }

    function createManager(config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string }) {
        addManager(config, shopId, user).then((res) => {
            // console.log("Res : ",res.data.message);
            navigate("/mannager")
            alert(res.message);
        }).catch((err) => {
            alert(err);
        })
    }

    function UpdateManager(config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string } , mId : number) {
        editManager(config, shopId, user , mId).then((res) => {
            // console.log("Res : ",res.data.message);
            navigate("/mannager")
            alert(res.message);
        }).catch((err) => {
            alert(err);
        })
    }

    

    return <ManagerContext.Provider value={{ UpdateManager , getManager , managers, createManager ,getSingleManager , singleManager }} >
        {children}
    </ManagerContext.Provider>
}
export default withUser(ManagerProvider);