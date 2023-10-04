import { ComponentType, useContext } from "react"
import { AlertContext } from "../Context/AlertContext";

export function withAlert(IncomingComponent: ComponentType<any>) {
    return function OutgoingFunction(prop: any) {
        const data = useContext(AlertContext);
        return <IncomingComponent {...prop} {...data} />
    }
}