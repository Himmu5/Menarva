/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, useContext } from "react";
import { UserContext } from "../Context/User";


export function withUser(IncomingComponent: ComponentType<any>) {
    return function OutgoingComponent(props: any) {
        const userData = useContext(UserContext);
        return <IncomingComponent {...props} {...userData} />
    }
}