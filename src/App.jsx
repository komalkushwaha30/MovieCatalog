// kindly check out thoughtProcess.md
import "./App.css";
import { Routes, Route } from "react-router"
import Login from "./components/Login";
import Register from "./components/Register";
import Display from "./components/Display"
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./components/Details";
import Like from "./components/Like";
import NotFound from "./components/NotFound";
function App() {
  
  

  return(
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<ProtectedRoute><Display/></ProtectedRoute>} />
        <Route path="/:title" element={<Details/>} />
        <Route path="like" element={<Like/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App;
