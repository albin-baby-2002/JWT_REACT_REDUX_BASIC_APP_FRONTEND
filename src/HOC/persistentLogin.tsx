import { useEffect, useState } from "react";
import UseRefreshToken from "../hooks/useRefreshToken"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AuthInfo } from "../redux/auth";



const PersistentLogin = () => {
    
    const [isLoading,setIsLoading] = useState(true)
    
    const refresh = UseRefreshToken();
    
    const auth = useSelector((state:RootState)=>state.auth);
    
    useEffect(()=>{
        
        const refreshJwt_SetAuth = async()=>{
            
            try{
                await refresh()
            }
            
            catch(err){
                
                console.error(err)
                
            }
            finally{
                
                setIsLoading(false)
            }
        }
        
      
        
        !auth?.accessToken ? refreshJwt_SetAuth(): setIsLoading(false)
        
    },[auth])
    
  return (
   isLoading ? <p>Loading ...</p> : <Outlet/> 
  )
}

export default PersistentLogin
