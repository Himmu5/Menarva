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
import { UserContext } from "./Context/User"
import { useState } from "react"

function App() {

  // const [user , setUser] = useState();

  return (
    <div className="">
      <UserContext.Provider value={{  }} >
        <Navbar />
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/calendar" element={<StoreCalendar />} />
          <Route path="/Camera" element={<Camera />} />
          <Route path="/StoreOptions" element={<StoreOptions />} />
          <Route path="/uploadsales" element={<UploadSales />} />
          <Route path="/mannager" element={<Mannager />} />
          <Route path="/mannager/edit" element={<AddEditManager />} />
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
