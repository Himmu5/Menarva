import { ComponentType, Context, useContext } from "react";
import { UserContext } from "../Context/User";
import { AlertContext } from "../Context/AlertContext";
import { ShopContext } from "../Context/Store";
import { ManagerContext } from "../Context/Manager";
import { SopContext } from "../Context/SopContext";

function WithProvider(provider:Context<any>) {
  function MyHOC(IncomingComponent:ComponentType<any>) {
    function OutgoingComponent(propes:any) {
      const ContextData = useContext(provider);
      return <IncomingComponent {...propes} {...ContextData} />;
    }
    return OutgoingComponent;
  }
  return MyHOC;
}

export const withCart = WithProvider(UserContext);
export const withAlert = WithProvider(AlertContext);
export const withShop = WithProvider(ShopContext);
export const withManager = WithProvider(ManagerContext);
export const withSops = WithProvider(SopContext);

export default WithProvider;