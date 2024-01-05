import { Link, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import ProtectedRoute from "./HOC/protectedRoute"

const ROLES_LIST = {
    "Admin": 5150,
    "Editor": 1984,
    "User": 2001
}

const Home = ()=>{
  
  return(
    <h1>WElcome admins</h1>
  )
}

function App() {


  
  const router = createBrowserRouter(createRoutesFromElements(
    <> 
    
    <Route path="/" element={<h1>Welcome home <Link to='/admin'>admin</Link> </h1>}/>
    
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    
    
    <Route path="/admin" element={ <ProtectedRoute Element={Home} allowedRoles={[ROLES_LIST.Admin]}></ProtectedRoute>}/>
    
    </>
  ))
  
  return (<RouterProvider router={router}></RouterProvider>)
}

export default App
