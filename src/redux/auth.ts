import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthInfo = {
    
    roles: number[] 
    accessToken:string 
    user:string
}|null

const INITIAL_STATE  = null as AuthInfo

const authSlice = createSlice({
    name:'auth',
    initialState:INITIAL_STATE,
    reducers:{
        
        setAuth:(state:null | AuthInfo,action)=>{
            
     
            
          return action.payload 
            
             
            
        }
    }
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer