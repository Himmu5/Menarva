import { FC, ReactNode, useEffect, useState } from 'react'
import { getSOP } from '../../Axios/Sop';
import { withAlert } from '../../HOC/withProvider';
import { AlertType } from '../../Typings/Alert';
import { SopContext } from '../../Context/SopContext';
import { Sops } from '../../Typings/sops';

type P = {
    children: ReactNode;
    setAlert: (a: AlertType) => void
}

const SopProvider: FC<P> = ({ children, setAlert }) => {

    const [sops, setSOPS] = useState<Sops[]>();

    useEffect(() => {
        getSOPs();
    },[])

    function getSOPs() {
        getSOP().then((res) => {
            setSOPS(res);
        }).catch((err) => {
            setAlert({ type: 'error', message: err.message })
        })
    }

    return <SopContext.Provider value={{ sops }}>
        {children}
    </SopContext.Provider>
}
export default withAlert(SopProvider);