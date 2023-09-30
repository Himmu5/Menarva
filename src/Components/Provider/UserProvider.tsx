import { FC, ReactNode, useEffect, useState } from 'react'
import { loginUser } from '../../Axios/Auth';
import { User, UserConfig } from '../../Typings/User';
import { UserContext } from '../../Context/User';
import { getConfig } from '../../Axios/config';
type P = {
    children: ReactNode
}
const UserProvider: FC<P> = ({ children }) => {

    const [user, setUser] = useState<User>();
    const [shopId , setShopId ] = useState<number>();
    const [config, setUserConfig] = useState<UserConfig>();

    
    useEffect(() => {
        getConfig().then((res) => {
            
            setShopId(+Object.keys(res.result.authorities.shopAuthorities)[0]);
            setUserConfig(res.result.authorities.authorities);
            setUser(res.result.user);
        })
    }, [])

    function AuthUser(formData: { username: string, password: string }) {
        loginUser(formData).then((res) => {
            localStorage.setItem('token', res.accessToken);
            setUser(res);
        }).catch(() => {
            alert("User is not validate");
        })
    }

    function removeUser() {
        localStorage.removeItem('token');
        setUser(undefined);
    }

    return <UserContext.Provider value={{ config , user, removeUser, AuthUser , shopId }} >
        {children}
    </UserContext.Provider>
}
export default UserProvider;