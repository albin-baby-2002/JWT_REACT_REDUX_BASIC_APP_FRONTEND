import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate } from "react-router-dom"


const Users = () => {
    
    const navigate =  useNavigate();
    
    
    const [users,setUsers] = useState()
    
    const axiosPrivate = useAxiosPrivate()
    
    useEffect(()=>{
        
        let isMounted = true;
        
        const controller = new AbortController();
        
        const getUsers = async ()=>{
            
            try{
                
                const response = await axiosPrivate.get('/users',{
                    signal:controller.signal
                })
                
                console.log(response?.data)
                
                isMounted && setUsers(response.data.yes)
                
            }
            catch(err:any){
                if(!err.response){
                console.error(err?.message)
                    
                }
                
                if(err?.response?.status === 401 || err?.response?.status === 403 ){
                     console.error(err?.response)
                     navigate('/')
                }
                
               
            }
        }
        
        getUsers()
        
        return ()=>{
            
            isMounted= false
            controller.abort()
        }
        
    },[])
    
  return (
    <div>
      {users}
    </div>
  )
}

export default Users
