import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Common/Navbar"
import SignIn from "./Components/SignIn/SignIn"
import Home from "./Components/SOP/Home"
import Stores from "./Components/Store/Stores"
import StoreCalendar from "./Components/Store/Calendar"
import Camera from "./Components/Camera/Camera"

function App() {

  return (
    <div className="">

      <Navbar />
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/calendar" element={<StoreCalendar />} />
        <Route path="/Camera" element={<Camera /> } />
      </Routes>

    </div>
  )
}

export default App
