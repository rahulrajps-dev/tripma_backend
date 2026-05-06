import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./Home";
import Login from "./pages/Login"
import TripDetails from "./pages/TripDetails";
import Properties from "./pages/Properties";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/TripDetails" element={<TripDetails/>}/>
      <Route path = "/Properties" element={<Properties/>}/>
      </Routes></BrowserRouter>
  )
}
export default App;