import axios from "../api/axios";
import { AuthType } from "../context/authContext";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth() as AuthType;

    const logout = async () => {
       
        try {
            
            const response = await axios.post('/logout', {
                withCredentials: true
            });
             setAuth(null);
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout