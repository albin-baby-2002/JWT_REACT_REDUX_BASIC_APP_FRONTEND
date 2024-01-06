import { Link, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import ProtectedRoute from "./HOC/protectedRoute"
import Home from "./components/Home"
import Users from "./components/Users"
import PersistentLogin from "./HOC/persistentLogin"

const ROLES_LIST = {
    "Admin": 5150,
    "Editor": 1984,
    "User": 2001
}

const Admin = ()=>{
  
  return(
    <h1>WElcome admins</h1>
  )
}

function App() {


  
  const router = createBrowserRouter(createRoutesFromElements(
    <> 
    
   <Route  element={<PersistentLogin/>}>
    
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    
     <Route path="/" element={<ProtectedRoute Element={Home} allowedRoles={[ROLES_LIST.User,ROLES_LIST.Admin]}></ProtectedRoute>}/>
     
    <Route path="/admin" element={ <ProtectedRoute Element={Admin} allowedRoles={[ROLES_LIST.Admin]}></ProtectedRoute>}/>
    
    <Route path="/users" element={ <ProtectedRoute Element={Users} allowedRoles={[ROLES_LIST.Admin]}></ProtectedRoute>}/>
   </Route>
    
    
    </>
  ))
  
  return (<RouterProvider router={router}></RouterProvider>)
}

export default App
