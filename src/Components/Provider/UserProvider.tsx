import { FC, ReactNode, useEffect, useState } from 'react'
import { loginUser } from '../../Axios/Auth';
import { UserClass, UserConfig } from '../../Typings/User';
import { UserContext } from '../../Context/User';
import { getConfig } from '../../Axios/config';
import { AlertType } from '../../Typings/Alert';
import Loading from '../../Loader/Loading';
import { withAlert } from '../../HOC/withProvider';
import { checkResponse } from '../../ErrorHandling/ResponseCheck';
import { Authorities } from '../../Typings/Manager';
import { getURLAuthentication } from '../../Axios/CheckURL';
import { Navigate, useNavigate } from 'react-router-dom';
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
    const [accessToken, setAccessToken] = useState<string>();
    const [pageFallback, setPageFallback] = useState<boolean>(false);
    const Navigate = useNavigate();

    // useEffect(() => {
    //     getURLAuthentication().then((res) => {
    //         if (res.fallbackToDefault === true) {
    //             setPageFallback(true);
    //             Navigate("DefaultPage")
    //         }
    //         if (res.fallbackToDefault === false) {
    //             Navigate("/")
    //         }
    //     })
    // }, [])

    useEffect(() => {
        if (token) {
            updateConfig();
        }
    }, [])


    function updateConfig() {
        if (token) {
            setLoading(true);
            getConfig().then((res) => {
                setUser(res.result);
                setShopConfig(res.result.authorities);
                setLoading(false);
                setUserConfig(res.result.authorities);
            }).catch(() => {
                // localStorage.removeItem("token");
                setLoading(false);
            });
        }
        else {
            setLoading(false);
        }
    }

    function AuthUser(formData: { username: string, password: string }) {
        loginUser(formData, checkResponse, setAlert).then((res: any) => {
            
            if (res) {                
                checkResponse(res, setAlert);
                setAccessToken(res.user.accessToken)
                localStorage.setItem('token', res.user.accessToken);
                setUser(res.user.user);
                setUserConfig(res.config);
                setShopConfig(res.config);
            }

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

    return <UserContext.Provider value={{ pageFallback, accessToken, token, shopConfig, config, user, removeUser, AuthUser, shopId }} >
        {children}
    </UserContext.Provider>
}
export default withAlert(UserProvider);