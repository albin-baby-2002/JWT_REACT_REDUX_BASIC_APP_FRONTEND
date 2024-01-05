
import { ReactNode, createContext, useState } from "react";

export interface auth {
    roles: number[]
    accessToken:string 
    user:string
}

export type AuthType = {
    
    auth:auth|null,
    setAuth:React.Dispatch<React.SetStateAction<auth | null>>
}

export const AuthContext = createContext<AuthType|null>(null);


 const AuthContextProvider = ({children}:{children:ReactNode})=>{
    
    const [auth,setAuth] = useState<auth| null>(null);
    
    const values = {auth,setAuth}
    
    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
    
    
}

export default AuthContextProvider