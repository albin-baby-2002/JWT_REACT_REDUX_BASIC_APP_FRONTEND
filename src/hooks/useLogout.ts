import { useDispatch } from "react-redux";
import axios from "../api/axios";


import { setAuth } from "../redux/auth";

const useLogout = () => {
    // const { setAuth } = useAuth() as AuthType;
    
    const dispatch = useDispatch()

    const logout = async () => {
       
        try {
            
            const response = await axios.get('/logout', {
                withCredentials: true
            });
             
            dispatch(setAuth(null))
            
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout