import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { user } from './Users'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

type props = {
    
    showEditModal:boolean
    setShowEditModal:React.Dispatch<React.SetStateAction<boolean>>
    userToEdit:user|null
    setTriggerUserUpdate:React.Dispatch<React.SetStateAction<boolean>>
}

const USER_MANAGEMENT_URL = '/admin/users'

const EditUserModal = ({showEditModal,setShowEditModal,userToEdit ,setTriggerUserUpdate}:props) => {
    const axiosPrivate = useAxiosPrivate()
    const [username,setUsername] = useState("")
    const [phone,setPhone] = useState("")
    
    const editUserInfo = async()=>{
        
        
         
        try{
            
            
            console.log('delete' , userToEdit?._id);
            
            
            const response = await axiosPrivate.patch(`${USER_MANAGEMENT_URL}/${userToEdit?._id}`,{username,phone})
            
            
            console.log(response.data)
            
            setTriggerUserUpdate((prev)=>!prev)
            
            setShowEditModal(false)
            
        }
        
        catch(err){
            
            window.alert('failed update')
        }
    }
    
    
    useEffect(()=>{
        
        if(userToEdit){
            
            setUsername(userToEdit.username)
            
            setPhone(userToEdit.phone)
        }
        
        
    },[userToEdit])
    
  return (
     <div className={`${showEditModal ? 'flex':'hidden'} fixed top-0  h-screen w-screen bg-black/60  items-center justify-center  `}>
        
        
            
            <div className=" bg-black text-white  w-1/2 rounded-lg ">
                
                <div className=' flex  justify-end '>
            
                        <FontAwesomeIcon 
                            className=' text-white text-xl mr-4 mt-4 cursor-pointer'
                            icon={faXmark}
                            onClick={()=>{setShowEditModal(false)}}
                            >
                                
                            </FontAwesomeIcon>
                        
                 </div>
                
                <h3 className=" text-center font-mono font-bold text-2xl mt-6 mb-3">Edit User Info</h3>
                
                <div className=" grid   items-center">
                    
                    <div className=" flex  flex-col w-1/2 mx-auto">
                        
                        <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-7" type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)} />
                        
                    </div>
                    
                    <div className=" flex  flex-col w-1/2 mx-auto">
                        
                        <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-7" type="text" 
                        placeholder="Phone"
                        value={phone} 
                        onChange={(e)=>setPhone(e.target.value)}
                         />
                        
                    </div>
                    
                    
                    <div className=' my-7 flex justify-center'>
                        <button className='  bg-slate-200 text-black px-3 py-1 rounded-md hover:bg-emerald-300 cursor-pointer'
                        onClick={()=>{ editUserInfo()}}
                        >Edit user info</button>
                    </div>
                    
                    
                    
                </div>
                
                
            </div>
            
        </div>
  )
}

export default EditUserModal
