import { FC, ReactNode } from 'react'
import { UserClass } from '../../Typings/User'
import { Navigate } from 'react-router-dom'
import { withUser } from '../../HOC/withProvider'
type P = {
    children: ReactNode,
    user: UserClass
}

const UserRoute: FC<P> = ({ user, children }) => {
    if (!user) {
        return <Navigate to={'/signin'} />
    }
    return <div>
        {children}
    </div>
}
export default withUser(UserRoute);