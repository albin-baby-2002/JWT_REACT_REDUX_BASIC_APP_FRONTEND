import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import  {user} from './Users'

type userData = {
    
    id:string,
    username:string,
    email:string,
    phone:string,
    handleUserDeletion:(userId: String) => Promise<void>,
    setShowEditModal:React.Dispatch<React.SetStateAction<boolean>>,
    setUserToEdit: React.Dispatch<React.SetStateAction<  user | null>>
    
    
}

const Row = ({id,
            username,
            email,
            phone
            ,handleUserDeletion,
            setShowEditModal,
            setUserToEdit}:userData) => {
  
  useEffect(()=>{
    
    console.log('row render' , username)
    
    
  },[])
  
  return (
     <div className=" w-full   bg-black/85  text-slate-400 rounded-lg   grid grid-cols-4   mb-3 ">
                
                <div className="    text-center   flex  items-center justify-center" >  <p className='  py-5'>  {username}   </p> </div>
                
                <div className="   text-center   flex  items-center justify-center " >  <p className='  py-5'> {email} </p>  </div>
                <div className="    text-center  flex  items-center justify-center "> <p className='  py-5'> {phone} </p>  </div>
                
                <div className="    text-center  flex  items-center  justify-center  gap-10 ">
                  
                  
                  <FontAwesomeIcon onClick={()=>handleUserDeletion(id)}  className=' hover:text-red-600 cursor-pointer' icon={faTrash}></FontAwesomeIcon>
                  
                  
                  <FontAwesomeIcon
                  
                     className=' hover:text-green-600 cursor-pointer '
                     icon={faEdit}
                     
                     onClick={()=>{
                      
                      setUserToEdit({_id:id,username,email,phone})
                      
                      setShowEditModal(true)
                      
                      
                     }}
                     
                     ></FontAwesomeIcon>
                  
                  
               </div>
                
            </div>
  )
}

export default Row
