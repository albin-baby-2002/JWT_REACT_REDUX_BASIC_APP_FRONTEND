

import axios from '../api/axios';
import { setAuth } from '../redux/auth';
import { useDispatch } from 'react-redux';
import { faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, } from 'react-router-dom';

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ADMIN_LOGIN_URL = '/admin/auth';

const AdminLogin = () => {
  
    const dispatch = useDispatch()  
    const navigate = useNavigate();
  

    const userRef = useRef<HTMLInputElement>(null);
   

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    

    useEffect(() => {
      
        userRef?.current?.focus();
        
    }, [])
    
      useEffect(()=>{
        
        setValidEmail(EMAIL_REGEX.test(email));
        
    },[email])
    

    useEffect(() => {
      
        setErrMsg('');
        
    }, [email, pwd])
    
    
    const handleSubmit = async(e:FormEvent)=>{
        
        e.preventDefault();
      
        if( !email || !pwd ){
            
            return setErrMsg('invalid Credentials')
            
        }
        
        try {
          
            const response = await axios.post(ADMIN_LOGIN_URL,
                JSON.stringify({ email, pwd }),
                
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
          
            navigate('/admin/users',{replace:true})
            
            const userName = response?.data?.user;
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            
     
            dispatch(setAuth({roles,accessToken,user:userName}))
            
            setEmail('');
            setPwd('');
           
        } catch (err:any) {
          
            if (!err?.response) {
              
                setErrMsg('No Server Response');
                
            }  else if (err.response?.status === 400) {
              
                setErrMsg('Missing Email or Password');
                
            } else if (err.response?.status === 404) {
              
                setErrMsg('Email Not Registered ');
                
            } else if (err.response?.status === 403){
                
                setErrMsg("You Don't Have Admin privileges")
            }
            
            else if (err.response?.status === 401) {
              
                setErrMsg(' Wrong Email or Password');
                
            }else if (err.response?.status === 500) {
              
                setErrMsg('Oops! Something went wrong. Please try again later.');
                
            }
             else {
              
                setErrMsg('Login Failed');
            }
            
        }
    }
  
  
  return  (
    
    <section className="bg-gray-50 dark:bg-gray-900 py-7 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6  mx-auto n "> 
      
        <h1 className='pt-10 text-3xl pb-10 text-white font-bold'> Admin Login Page</h1>
        
         <p className={errMsg?"mb-7 flex  absolute  top-6 right-3 items-center justify-between  bg-red-300  min-w-[300px] px-4 py-1 rounded-md font-mono":"hidden "}>Error: {errMsg } <FontAwesomeIcon  onClick={()=>{setErrMsg('')}} icon={faXmark} className=" cursor-pointer   ps-2 "/></p>
       
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900">
            
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            
           
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className=" flex gap-2 items-end  mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email  <FontAwesomeIcon icon={faCheck} className={validEmail ? " block text-md mb-[1.5px] text-green-400" : " hidden "} /> 
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hidden" : " block   text-red-600  text-md mb-[2px]"} /></label>
                <input
                ref={userRef}
                  type="Email"
                  name="Email"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete='new-password'
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 
                  value={pwd}
                  onChange= {(e)=>{setPwd(e.target.value)}}
                />
              </div>
              <div className="flex items-center justify-between">
                
                
              </div>
              <button
                type="submit"
                className="w-full text-bg-primary-600 font-bold bg-white hover:bg-emerald-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin
