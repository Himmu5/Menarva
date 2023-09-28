import { ComponentType, useContext } from "react";
import { ShopContext } from "../Context/Store";

export function withShop(IncomingComponent: ComponentType<any>) {
    return function Outgoingfunction(props: any) {
        const data = useContext(ShopContext);
        return <IncomingComponent {...props} {...data} />
    }
}