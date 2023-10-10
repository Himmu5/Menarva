import { FC, ReactNode, useEffect } from 'react'
import { getSOP } from '../../Axios/Sop';

type P = {
    children: ReactNode
}

const SopProvider: FC<P> = ({ children }) => {

    useEffect(() => {
        getSOP();
    }, [])

    return <div>

        {
            children
        }

    </div>
}
export default SopProvider;