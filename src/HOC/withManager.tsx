
import { ComponentType, useContext } from "react";
import { ManagerContext } from "../Context/Manager";


export function withManager(IncomingComponent: ComponentType<any>) {
    return function OutgoingComponent(props: any) {
        const userData = useContext(ManagerContext);
        return <IncomingComponent {...props} {...userData} />
    }
}