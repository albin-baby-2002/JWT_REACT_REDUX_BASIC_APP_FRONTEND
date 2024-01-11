import { useRef, useState, useEffect, FormEvent } from "react";
import { faCheck, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";





const USER_MANAGEMENT_URL = '/admin/users'

const USER_REGEX = /^[A-Za-z]{3,}( [A-Za-z]+)?$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const IND_PHONE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;





type props ={
    
    showAddUserModal:Boolean,
    setShowAddUserModal:React.Dispatch<React.SetStateAction<boolean>>,
    setTriggerUserUpdate:React.Dispatch<React.SetStateAction<boolean>>
}



const AddUserModal = ({showAddUserModal,setShowAddUserModal,setTriggerUserUpdate}:props) => {
  
    
    const axiosPrivate = useAxiosPrivate()
    const userRef = useRef<HTMLInputElement>(null);
  

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    
    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
  

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);


    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
 

    const [errMsg, setErrMsg] = useState('');
    
    useEffect(()=>{
        
        userRef.current?.focus();
        
    },[])
    
    
    useEffect(()=>{
      
        setValidName(USER_REGEX.test(user));
        
    },[user])
    
    useEffect(()=>{
        
        setValidEmail(EMAIL_REGEX.test(email));
        
    },[email])
    
    useEffect(()=>{
        
        setValidPhone(IND_PHONE_REGEX.test(phone));
        
    },[phone])
    
    
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])
    
    
    useEffect(()=>{
        
        setErrMsg('')
    },[user,pwd,matchPwd,email,phone])
    
    
    const handleSubmit = async(e:FormEvent)=>{
        
        e.preventDefault();
        
        
        if(!validName || !validPwd || !validMatch|| !email || !phone || !user || !pwd || !matchPwd || !validEmail || !validPhone ){
            
            setErrMsg('invalid Credentials')
            
            return
        }
        
        try {
          
            const response = await axiosPrivate.post(USER_MANAGEMENT_URL,
                JSON.stringify({ user, pwd , email, phone }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
          
         
            
            setUser('');
            setPwd('');
            setMatchPwd('');
            setEmail('')
            setPhone('')
            
            setTriggerUserUpdate((prev)=>!prev)
            
            setShowAddUserModal(false)
           
            
            
            
        } catch (err:any) {
          
            if (!err?.response) {
              
                setErrMsg('No Server Response');
                
            } else if (err.response?.status === 400){
              
              setErrMsg('All Fields are Mandatory')
              
            } else if (err.response?.status === 409) {
              
                setErrMsg('Email Taken');
                
            } else if (err.response?.status === 500) {
              
                setErrMsg('Oops! Something went wrong. Please try again later.');
                
            } 
            
            else {
              
                setErrMsg('Registration Failed')
                
            }
            
        }
    }
    
    

    
  return  (
    <section className={`${showAddUserModal?'block':'hidden'} fixed top-0 w-full dark:bg-black/60 min-h-screen pt-5`}>
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen-screen  pt-5 ">
        
        <p className={errMsg?"mb-7 flex  items-center justify-between  bg-red-300  min-w-[300px] px-4 py-1 rounded-md font-mono":"hidden "}>Error: {errMsg} <FontAwesomeIcon onClick={()=>{setErrMsg('')}} icon={faXmark} className=" cursor-pointer "/></p>
       
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            
            
            <div className=" flex justify-between items-center">
                
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add New User
            </h1>
            
            <FontAwesomeIcon  className=" text-white  text-xl pt-1 cursor-pointer" icon={faXmark} onClick={()=>{
                setShowAddUserModal(false)
            }}></FontAwesomeIcon>
            
            </div>
            
            
            
            
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                
                
            <div className=" flex gap-3">
                       
              <div>
                <label htmlFor="UserName" className="flex gap-2 items-end mb-2 text-sm font-medium text-gray-900 dark:text-white">Username  <FontAwesomeIcon icon={faCheck} className={validName ? " block text-md mb-[1.5px] text-green-400" : " hidden "} /> 
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hidden" : " block   text-red-600  text-md mb-[2px]"} /></label>
                <input
                  type="text"
                  name="text"
                  id="UserName"
                  ref={userRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={user}
               
                  onChange={(e)=>(setUser(e.target.value))}
                
                />
                
               
                
              </div>
              
               <div>
                <label htmlFor="UserEmail" className="flex gap-2 items-end mb-2 text-sm font-medium text-gray-900 dark:text-white">Email  <FontAwesomeIcon icon={faCheck} className={validEmail ? " block text-md mb-[1.5px] text-green-400" : " hidden "} /> 
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hidden" : " block   text-red-600  text-md mb-[2px]"} /></label>
                <input
                  type="email"
                  name="email"
                  id="UserEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={email}
               
                  onChange={(e)=>(setEmail(e.target.value))}
                
                />
                
               
                
              </div>
              
            </div>
            
            
             <div>
                <label htmlFor="UserPhone" className="flex gap-2 items-end mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone  <FontAwesomeIcon icon={faCheck} className={validPhone ? " block text-md mb-[1.5px] text-green-400" : " hidden "} /> 
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hidden" : " block   text-red-600  text-md mb-[2px]"} /></label>
                <input
                  type="text"
                  name="text"
                  id="UserPhone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={phone}
               
                  onChange={(e)=>(setPhone(e.target.value))}
                
                />
                
               
                
              </div>
            
            <div className=" flex gap-3">
                
                
              
              
                <div>
                <label htmlFor="password" className=" flex items-end gap-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password 
                <FontAwesomeIcon icon={faCheck} className={validPwd ? " block text-md mb-[1.5px] text-green-400" : " hidden "} /> 
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : " block   text-red-600  text-md mb-[2px]"} />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={pwd}
                  onChange={(e)=>(setPwd(e.target.value))}
                  
                />
              </div>
              
              
              <div>
                <label htmlFor="confirm-password" className="flex items-end gap-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? " block text-md mb-[1.5px] text-green-400" : " hidden "} /> 
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : " block   text-red-600  text-md mb-[2px]"} /></label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={matchPwd}
                  onChange={(e)=>(setMatchPwd(e.target.value))}
                />
              </div>
            </div>
                
             
              
              
              
              
              
              
              
              
              
            
              
              <button 
              disabled={!validName || ! validPwd || !validMatch ? true:false}
                type="submit"
                className="w-full text-bg-primary-600 font-bold bg-white hover:bg-emerald-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddUserModal
