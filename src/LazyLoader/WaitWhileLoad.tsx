import { FC, ReactNode, Suspense } from "react";
import Loading from "../Loader/Loading";

type P = {
    children: ReactNode
}

const WaitWhileLoad: FC<P> = ({ children }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
export default WaitWhileLoad;  