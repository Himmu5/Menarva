import { FC, ReactNode, useState } from 'react'
import { AlertContext } from '../../Context/AlertContext';
import { AlertType } from '../../Typings/Alert';

type P = {
    children: ReactNode
}

const AlertProvider: FC<P> = ({ children }) => {

    const [alert, setAlert] = useState<AlertType>();

    function RemoveAlert() {
        setAlert(undefined);
    }

    return <AlertContext.Provider value={{ RemoveAlert, alert, setAlert }}>
        {children}
    </AlertContext.Provider>
}
export default AlertProvider;