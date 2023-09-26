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


function App() {

  return (
    <div className="">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="signin" element={<AuthRoute><SignIn /></AuthRoute>} />
          <Route path="/" element={<UserRoute><Home /></UserRoute>} />
          <Route path="/stores" element={<UserRoute><Stores /></UserRoute>} />
          <Route path="/calendar" element={<UserRoute><StoreCalendar /></UserRoute>} />
          <Route path="/Camera" element={<UserRoute><Camera /></UserRoute>} />
          <Route path="/StoreOptions" element={<UserRoute><StoreOptions /></UserRoute>} />
          <Route path="/uploadsales" element={<UserRoute><UploadSales /></UserRoute>} />
          <Route path="/mannager" element={<UserRoute><Mannager /></UserRoute>} />
          <Route path="/mannager/edit" element={<UserRoute><AddEditManager /></UserRoute>} />
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App
