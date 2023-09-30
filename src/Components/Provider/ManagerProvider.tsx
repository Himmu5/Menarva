import { FC, ReactNode, useEffect, useState } from 'react'
import { ManagerContext } from '../../Context/Manager';
import { addManager, getManagers } from '../../Axios/manager';
import { UserClass, UserConfig } from '../../Typings/User';
import { Navigate } from 'react-router-dom';
import { Manager } from '../../Typings/Manager';
import { withUser } from '../../HOC/withUser';

type P = {
    children: ReactNode;
    user : UserClass
}

const ManagerProvider: FC<P> = ({ children , user }) => {


    const [managers, setManagers] = useState<Manager[]>();
    // const Navigate = useNavigate();

    useEffect(() => {
        // addSales()
        getManagers().then((res) => {
            console.log("res : ", res);
            setManagers(res.result);
        })
    }, [user])

    function createManager(config: UserConfig, shopId: number, user: { name: string; email: string; password: string; type: string }) {
        addManager(config, shopId, user).then((res) => {
            // console.log("Res : ",res.data.message);
            alert(res.message);
            return <Navigate to={"/manager"} />
        }).catch((err) => {
            alert(err);
        })
    }



    return <ManagerContext.Provider value={{ managers, createManager }} >
        {children}
    </ManagerContext.Provider>
}
export default withUser(ManagerProvider);