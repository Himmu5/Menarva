import { FC, ReactNode, useEffect, useState } from 'react'
import { loginUser } from '../../Axios/Auth';
import { UserClass, UserConfig } from '../../Typings/User';
import { UserContext } from '../../Context/User';
import { getConfig } from '../../Axios/config';
import { withAlert } from '../../HOC/withAlert';
import { AlertType } from '../../Typings/Alert';
import Loading from '../../Loader/Loading';
type P = {
    children: ReactNode,
    setAlert: (s: AlertType) => void,
}
const UserProvider: FC<P> = ({ children, setAlert }) => {

    const [user, setUser] = useState<UserClass>();
    // console.log("User : ", user);
    const [shopId, setShopId] = useState<number>();
    const [config, setUserConfig] = useState<UserConfig>();
    const [shopConfig, setShopConfig] = useState<UserConfig>();
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState<boolean>(false);
    

    useEffect(() => {
        if (token) {
            updateConfig();
        }
    }, [])

    function updateConfig() {
        if(token){
            setLoading(true);
            getConfig().then((res) => {
                setLoading(false);
                let sid = Object.keys(res.result.authorities.shopAuthorities)[0];
                setShopConfig(res.result.authorities.shopAuthorities[sid]);
                setShopId(+Object.keys(res.result.authorities.shopAuthorities)[0]);
                setUserConfig(res.result.authorities.authorities);
                setUser(res.result.user);
            }).catch(() => {
                localStorage.removeItem("token");
                setLoading(false);
              });
        }
        else{
            setLoading(false);            
        }
    }

    function AuthUser(formData: { username: string, password: string }) {
        loginUser(formData).then((res) => {

            localStorage.setItem('token', res.user.accessToken);
            setAlert({ type: "success", message: "Logged In Successfully" });
            // console.log("Authority : ",res.config.result.authorities.shopAuthorities);
            let sid = Object.keys(res.config.result.authorities.shopAuthorities)[0];
            setShopConfig(res.config.result.authorities.shopAuthorities[sid]);
            setUser(res.user.user);
            setUserConfig(res.config.result.authorities.authorities);
            setShopId(+Object.keys(res.config.result.authorities.shopAuthorities)[0]);
        }).catch((err) => {
            setAlert({ type: "error", message: err.message })
        })
    }

    function removeUser() {
        localStorage.removeItem('token');
        setAlert({ type: "success", message: "Logged Out Successfully" })
        setUser(undefined);
    }
    
  if (loading) {
    return <Loading />;
  }

    return <UserContext.Provider value={{ token, shopConfig, config, user, removeUser, AuthUser, shopId }} >
        {children}
    </UserContext.Provider>
}
export default withAlert(UserProvider);