import axios from "../api/axios"
import { AuthType } from "../context/authContext"
import useAuth from "./useAuth"


const UseRefreshToken = () => {
 
    const {setAuth} = useAuth() as AuthType
    
    const refresh = async ()=>{
        
        const response = await axios.get('/refresh',{
            withCredentials:true
        });
        
        setAuth((prev: any) =>{
            
            console.log('prev: ',prev);
            console.log('new: ',response.data.accessToken);
            
            
            return{...prev,accessToken:response.data.accessToken ,roles:response.data.roles,user:response.data.user}
        })
        
        return response.data.accessToken
    }
    
    return refresh
    
}

export default UseRefreshToken
