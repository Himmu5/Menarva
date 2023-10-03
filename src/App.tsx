import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Common/Navbar"
import SignIn from "./Components/SignIn/SignIn"
import Home from "./Components/SOP/Home"
import Stores from "./Components/Store/Stores"
import StoreCalendar from "./Components/Store/Calendar"
import Camera from "./Components/Camera/Camera"
import StoreOptions from "./Components/Store/StoreOptions"
import UploadSales from "./Components/SaleReportUpload/UploadSales"
import Mannager from "./Components/SaleReportUpload/Mannager"
import AddEditManager from "./Components/SaleReportUpload/AddEditManager"
import AuthRoute from "./Components/Routes/AuthRoute"
import UserRoute from "./Components/Routes/UserRoute"
import UserProvider from "./Components/Provider/UserProvider"
import Options from "./Components/Store/Options"
import Ministores from "./Components/Ministores/Ministores"
import Error from "./Components/Error/404Page"
import MiniOptions from "./Components/Ministores/Options"
import ShopProvider from "./Components/Provider/ShopProvider"
import ShowSalesReport from "./Sales/ShowSalesReport"
import ManagerProvider from "./Components/Provider/ManagerProvider"


function App() {

  return (
    <div >
      <UserProvider>
        <ShopProvider>
          <ManagerProvider>
            <Navbar />
            <Routes>
              <Route path="signin" element={<AuthRoute><SignIn /></AuthRoute>} />
              <Route path="/SOP" element={<UserRoute><Home /></UserRoute>} />
              <Route path="/shops" element={<UserRoute><Stores /></UserRoute>} />
              <Route path="/shop/options" element={<UserRoute><Options /></UserRoute>} />
              <Route path="/minishops/:id" element={<UserRoute><Ministores /></UserRoute>} />
              <Route path="/calendar" element={<UserRoute><StoreCalendar /></UserRoute>} />
              <Route path="/Camera" element={<UserRoute><Camera /></UserRoute>} />
              <Route path="/" element={<UserRoute><StoreOptions /></UserRoute>} />
              <Route path="/ministore/uploadsales" element={<UserRoute><UploadSales /></UserRoute>} />
              <Route path="/mannager" element={<UserRoute><Mannager /></UserRoute>} />
              <Route path="/mannager/edit/:Form_Type" element={<UserRoute><AddEditManager /></UserRoute>} />
              <Route path="/ministore/options" element={<UserRoute><MiniOptions /></UserRoute>} />
              <Route path="/ministore/sales/report" element={<UserRoute><ShowSalesReport /></UserRoute>} />
              <Route path="*" element={<Error />} />
            </Routes>
          </ManagerProvider>
        </ShopProvider>
      </UserProvider>
    </div>
  )
}

export default App
