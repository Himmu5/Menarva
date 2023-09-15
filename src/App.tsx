import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Common/Navbar"
import SignIn from "./Components/SignIn/SignIn"
import Home from "./Components/SOP/Home"

function App() {

  return (
    <div className="">

      <Navbar />
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Routes>


    </div>
  )
}

export default App
