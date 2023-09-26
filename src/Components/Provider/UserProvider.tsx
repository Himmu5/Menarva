import { FC, ReactNode, useState } from 'react'
import { loginUser } from '../../Axios/Auth';
import { User } from '../../Typings/User';
import { UserContext } from '../../Context/User';
type P = {
    children: ReactNode
}
const UserProvider: FC<P> = ({ children }) => {

    const [user, setUser] = useState<User>();

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

    return <UserContext.Provider value={{ user, removeUser, AuthUser }} >
        {children}
    </UserContext.Provider>
}
export default UserProvider;