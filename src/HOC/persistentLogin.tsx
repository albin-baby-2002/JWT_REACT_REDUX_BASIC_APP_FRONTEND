import { useEffect, useState } from "react";
import { AuthType } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import UseRefreshToken from "../hooks/useRefreshToken"
import { Outlet } from "react-router-dom";



const PersistentLogin = () => {
    
    const [isloading,setIsloading] = useState(true)
    
    const refresh = UseRefreshToken();
    
    const {auth} = useAuth() as AuthType
    
    useEffect(()=>{
        
        const refreshJwt_SetAuth = async()=>{
            
            try{
                await refresh()
            }
            
            catch(err){
                
                console.error(err)
                
            }
            finally{
                setIsloading(false)
            }
        }
        
        console.log('persistent login')
        
        !auth?.accessToken ? refreshJwt_SetAuth(): setIsloading(false)
        
    },[auth])
    
  return (
   isloading ? <p>Loading ...</p> : <Outlet/> 
  )
}

export default PersistentLogin
