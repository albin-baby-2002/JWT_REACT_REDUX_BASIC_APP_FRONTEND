import React, { ReactElement, useEffect } from "react";

import { Navigate, Route, } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoute = ({Element,allowedRoles,}:{Element:React.ComponentType,allowedRoles:number[]}) => {

    const auth = useSelector((state:RootState)=>state.auth)
    
  return (
    
    
    auth?.roles.find(role => allowedRoles.includes(role))
    ?<Element />
   
    : auth?.user?  <Navigate to='..' replace={true}/> :
    <Navigate to='/login' replace={true}/>
    
  )
  
};

export default ProtectedRoute