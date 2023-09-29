import { FC, ReactNode } from 'react'
import { withUser } from '../../HOC/withUser'
import { User } from '../../Typings/User'
import { Navigate } from 'react-router-dom'
type P = {
    children: ReactNode,
    user: User
}

const AuthRoute: FC<P> = ({ user , children }) => {
    if (user) {
        return <Navigate to={'/'} />
    }
    return <div>
        {children}
    </div>
}
export default withUser(AuthRoute);