import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout";
import Row from "./Row";


const Users = () => {
    
    const navigate =  useNavigate();
    
    const logout = useLogout();
    
    const [users,setUsers] = useState()
    
    const axiosPrivate = useAxiosPrivate()
    
    useEffect(()=>{
        
        let isMounted = true;
        
        const controller = new AbortController();
        
        const getUsers = async ()=>{
            
            try{
                
                const response = await axiosPrivate.get('/admin/users',{
                    headers:{'Content-Type':'application/json'},
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
    <main className=" bg-slate-800 h-full w-full flow-root">
        
        <div onClick={()=>{
            
            logout() }} className=" text-end text-white text-xl font-bold mr-6 cursor-pointer hover:text-white/75 mt-4">Logout
            
        </div>
        
        <h1 className=" text-center  text-5xl font-MerriWeather text-emerald-400 pb-10 font-semibold"> Kings User Base </h1>
        
        <div className=" w-[80%] mx-auto">
            
            <div className=" w-full  bg-slate-300 h-9 flex  ">
                
                <div className=" flex-grow font-bold  text-center  border-r border-r-black flex  items-center justify-center" >  <p> User Name</p></div>
                <div className=" flex-grow font-bold text-center  border-r border-r-black flex  items-center justify-center " >  <p>Email Id</p>  </div>
                <div className=" flex-grow font-bold  text-center border-r border-r-black flex  items-center justify-center "> <p>Phone</p>  </div>
                
                <div className=" flex-grow font-bold  text-center border-r border-r-black flex  items-center justify-center "> <p>Actions</p>  </div>
                
            </div>
            
            <Row/>
            
        </div>
    
    </main>
  )
}

export default Users
