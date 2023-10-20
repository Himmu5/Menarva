import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserClass } from '../../Typings/User'
import { withUser } from '../../HOC/withProvider'
type P = {
    children: ReactNode,
    user: UserClass
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