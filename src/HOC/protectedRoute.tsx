import React, { ReactElement, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { AuthType } from "../context/authContext";
import { Navigate, Route, } from "react-router-dom";

const ProtectedRoute = ({Element,allowedRoles, ...rest}:{Element:React.ComponentType,allowedRoles:number[]}) => {
    
    const {auth} = useAuth() as AuthType;
    
    useEffect(()=>{
        console.log(auth);
        
    })
    
  
 
  return (
    
    auth?.roles.find(role => allowedRoles.includes(role))
    ?<Element />
   
    : auth?.user?  <Navigate to='..' replace={true}/> :
    <Navigate to='/login' replace={true}/>
    
  )
  
};

export default ProtectedRoute