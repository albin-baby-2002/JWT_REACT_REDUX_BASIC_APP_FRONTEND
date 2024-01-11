import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout";
import Row from "./Row";
import EditUserModal from "./EditUserModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AddUserModal from "./AddUsersModal";

const USER_MANAGEMENT_URL = '/admin/users'

 export type user = {
    
    _id:string,
    username:string,
    email:string,
    phone:string
    
}


const Users = () => {
    
    const navigate =  useNavigate();
    
    const logout = useLogout();
    
    const [searchQuery, setSearchQuery] = useState('')
    
    const [users,setUsers] = useState <user[] | []>([]);
    
    const [filteredUsers,setFilteredUsers] = useState <user[] | []>([]);
    
    const [triggerUserUpdate, setTriggerUserUpdate] = useState(false);
    
    const [userToEdit , setUserToEdit] = useState<user | null>(null);
    
    const [showEditModal, setShowEditModal] = useState(false);
    
    const [showAddUserModal,setShowAddUserModal] = useState(false)
    
    
    const axiosPrivate = useAxiosPrivate()
    
    
    useEffect(()=>{
        
      const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredUsers(filteredUsers)
        
    },[searchQuery])
    
   
    
    
    useEffect(()=>{
        
     
        
        let isMounted = true;
        
        const controller = new AbortController();
        
        const getUsers = async ()=>{
            
            try{
                
                console.log('data of users collected')
                
                const response = await axiosPrivate.get(USER_MANAGEMENT_URL,{
                    headers:{'Content-Type':'application/json'},
                    signal:controller.signal
                })
                
              
                
                isMounted && setUsers(response.data) ;
                isMounted && setFilteredUsers(response.data);
                
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
        
    } , [triggerUserUpdate ,showAddUserModal])
    
    
    const handleUserDeletion = async (userId:String)=>{
        
        
        try{
            
            
            console.log('delete' , userId);
            
            
            const response = await axiosPrivate.delete(`${USER_MANAGEMENT_URL}/${userId}`)
            
            
            console.log(response.data)
            
            setTriggerUserUpdate((prev)=>!prev)
            
        }
        
        catch(err){
            
            window.alert('failed deletion')
        }
        
    }
    
    
  return (
    
    <main className="  bg-zinc-300 min-h-full w-full flow-root">
        
        
        <div className=" w-[80%] mx-auto pt-7 mb-7">
            
            <div className=" flex justify-between pb-7">
                
                <h1 className=" text-  text-5xl  font-mono    text font-semibold"> Kings User Base </h1>
                
                <div onClick={()=>{
                    
                    logout() }} className=" text-end text-slate-900 text-xl font-bold mr-6 cursor-pointer hover:text-slate-900/75 mt-4">Logout
                    
                </div>
                
            </div>
            
            <div className=" my-5 ms-1  flex  gap-6">
                
                <input className=" text-lg p-1 ps-2 rounded-lg  text-white bg-black border-2 border-black outline-none" type="text" placeholder="search"
                
                value={searchQuery}
                
                onChange={(e)=>{
                    setSearchQuery(e.target.value)
                }}
                
                />
                
                <div className=" flex items-center bg-black text-white px-5 rounded-lg cursor-pointer ">
                    
                    <FontAwesomeIcon icon={faUserPlus}
                    onClick={()=>{
                        setShowAddUserModal(true)
                    }}
                    ></FontAwesomeIcon>
                    
                </div>
                
            </div>
            
            {filteredUsers?.map((user)=>(
                
                <Row  key={user._id} id={user._id} username={user.username} email={user.email} phone={user.phone} handleUserDeletion={handleUserDeletion} setShowEditModal={setShowEditModal} setUserToEdit={setUserToEdit}  />
               
            ))}
            
        </div>
        
        
        {/* edit user modal */}
        
        
       <EditUserModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} userToEdit={userToEdit} setTriggerUserUpdate ={setTriggerUserUpdate} />
       
       
       <AddUserModal showAddUserModal={showAddUserModal} setShowAddUserModal={setShowAddUserModal} setTriggerUserUpdate ={setTriggerUserUpdate}  />
        
        
       
       
    
    </main>
  )
}

export default Users
