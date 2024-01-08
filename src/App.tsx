import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import ProtectedRoute from "./HOC/protectedRoute"
import Home from "./components/Home"
import Users from "./components/Users"
import PersistentLogin from "./HOC/persistentLogin"
import Profile from "./components/Profile"

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
    
   <Route path="/" element={<PersistentLogin/>}>
    
    <Route index element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    
     
    <Route path="/admin" element={ <ProtectedRoute Element={Admin} allowedRoles={[ROLES_LIST.Admin]}></ProtectedRoute>}/>
    
     <Route path="/profile" element={ <ProtectedRoute Element={Profile} allowedRoles={[ROLES_LIST.User]}></ProtectedRoute>}/>
    
    <Route path="/users" element={ <ProtectedRoute Element={Users} allowedRoles={[ROLES_LIST.Admin]}></ProtectedRoute>}/>
    
   </Route>
    
    
    </>
  ))
  
  return (<RouterProvider router={router}></RouterProvider>)
}

export default App
