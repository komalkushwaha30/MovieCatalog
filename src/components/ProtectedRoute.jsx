// now here we  will setup the protected route
// first we will get the value of isAuthnticated 
import { Navigate } from "react-router"

const isAuthenticated=()=>{
    return localStorage.getItem("isAuthenticated") === "true";
}

const ProtectedRoute=({children})=>{
    if(!isAuthenticated()){
        return <Navigate to={"/"} replace />
    }
    return children;
}

export default ProtectedRoute;