import { useDispatch } from "react-redux"
import axios from "../api/axios"

import { setAuth } from "../redux/auth"


const UseRefreshToken = () => {
 
    
    const dispatch = useDispatch()
    
    const refresh = async ()=>{
        
        const response = await axios.get('/refresh',{
            withCredentials:true
        });
        
        dispatch(setAuth({accessToken:response.data.accessToken ,roles:response.data.roles,user:response.data.user}))
        
        
        return response.data.accessToken
    }
    
    return refresh
    
}

export default UseRefreshToken
