import { Route, Routes } from "react-router-dom"


import Navbar from "./Components/Common/Navbar"
import AuthRoute from "./Components/Routes/AuthRoute"
import UserRoute from "./Components/Routes/UserRoute"
import UserProvider from "./Components/Provider/UserProvider"
import ShopProvider from "./Components/Provider/ShopProvider"
import ManagerProvider from "./Components/Provider/ManagerProvider"
import AlertProvider from "./Components/Provider/AlertProvider"
import SopProvider from "./Components/Provider/SopProvider"
import Alert from "./Components/UI-Components/Alert"
import { Suspense, lazy, useEffect } from "react"
import Loading from "./Loader/Loading"
import WaitWhileLoad from "./LazyLoader/WaitWhileLoad"
import { getURLAuthentication } from "./Axios/CheckURL"
import Inventory from "./Inventory/Inventory"
import Billing from "./Inventory/Billing"

// Page for lazy load
const SignIn = lazy(() => import("./Components/SignIn/SignIn"))
const Home = lazy(() => import("./Components/SOP/Home"))
const Stores = lazy(() => import("./Components/Store/Stores"))
const StoreCalendar = lazy(() => import("./Components/Store/Calendar"))
const Camera = lazy(() => import("./Components/Camera/Camera"))
const StoreOptions = lazy(() => import("./Components/Store/StoreOptions"))
const UploadSales = lazy(() => import("./Components/SaleReportUpload/UploadSales"))
const Manager = lazy(() => import("./Components/SaleReportUpload/Mannager"))
const AddEditManager = lazy(() => import("./Components/SaleReportUpload/AddEditManager"))
const Options = lazy(() => import("./Components/Store/Options"))
const Ministores = lazy(() => import("./Components/Ministores/Ministores"))
const Error = lazy(() => import("./Components/Error/404Page"))
const MiniOptions = lazy(() => import("./Components/Ministores/Options"))
const ShowSalesReport = lazy(() => import("./Sales/ShowSalesReport"))

// import Sales from "./Inventory/Sales"
// import Billing from "./Inventory/Billing"
// import Inventory from "./Inventory/Inventory"


function App() {


  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        {/* 
        <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/billing" element={<Billing />}/>
      </Routes> */}

        <AlertProvider>
          <UserProvider>
            <ShopProvider>
              <ManagerProvider>
                <SopProvider>
                  <Navbar />
                  <Alert />
                  <Routes>
                    <Route path="signin" element={<AuthRoute> <SignIn /></AuthRoute>} />
                    <Route path="/SOP" element={<UserRoute><WaitWhileLoad><Home /></WaitWhileLoad></UserRoute>} />
                    <Route path="/shops" element={<UserRoute><WaitWhileLoad><Stores /></WaitWhileLoad></UserRoute>} />
                    <Route path="/shop/options" element={<UserRoute><WaitWhileLoad><Options /></WaitWhileLoad></UserRoute>} />
                    <Route path="/minishops/:id" element={<UserRoute><WaitWhileLoad><Ministores /></WaitWhileLoad></UserRoute>} />
                    <Route path="/calendar" element={<UserRoute><WaitWhileLoad><StoreCalendar /></WaitWhileLoad></UserRoute>} />
                    <Route path="/Camera" element={<WaitWhileLoad><UserRoute><Camera /></UserRoute></WaitWhileLoad>} />
                    <Route path="/" element={<UserRoute><WaitWhileLoad><StoreOptions /></WaitWhileLoad></UserRoute>} />
                    <Route path="/ministore/uploadsales" element={<UserRoute><WaitWhileLoad><UploadSales /></WaitWhileLoad></UserRoute>} />
                    <Route path="/manager" element={<UserRoute><WaitWhileLoad><Manager /></WaitWhileLoad></UserRoute>} />
                    <Route path="/manager/:Form_Type" element={<UserRoute><WaitWhileLoad><AddEditManager /></WaitWhileLoad></UserRoute>} />
                    <Route path="/ministore/options" element={<UserRoute><WaitWhileLoad><MiniOptions /></WaitWhileLoad></UserRoute>} />
                    <Route path="/ministore/sales/report" element={<UserRoute><WaitWhileLoad><ShowSalesReport /></WaitWhileLoad></UserRoute>} />
                    <Route path="*" element={<WaitWhileLoad><Error message="Page Not Found" /></WaitWhileLoad>} />
                  </Routes>
                </SopProvider>
              </ManagerProvider>
            </ShopProvider>
          </UserProvider>
        </AlertProvider>
      </div>
    </Suspense>
  )
}

export default App
