
import { useRef, useState, useEffect, FormEvent } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';
import { AuthType } from '../context/authContext';
const LOGIN_URL = '/auth';

const Login = () => {
  
    
    const {setAuth} = useAuth() as AuthType
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement>(null);
   

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
      
        userRef?.current?.focus();
        
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    
       const handleSubmit = async(e:FormEvent)=>{
        
        e.preventDefault();
        
        console.log('submit');
        
        
        
        if( !user || !pwd ){
            
            setErrMsg('invalid Credentials')
            
            return
        }
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
          
            console.log(JSON.stringify(response?.data));
            navigate('/',{replace:true})
            const userName = response?.data?.user;
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({roles,accessToken,user:userName})
            setUser('');
            setPwd('');
           
        } catch (err:any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }  else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            
        }
    }
  
  
  return  (
    <section className="bg-gray-50 dark:bg-gray-900 py-7 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto n lg:py-0">
        
         <p className={errMsg?"mb-7 flex  items-center justify-between  bg-red-300  min-w-[300px] px-4 py-1 rounded-md font-mono":"hidden "}>Error: {errMsg} <FontAwesomeIcon onClick={()=>{setErrMsg('')}} icon={faXmark} className=" cursor-pointer "/></p>
       
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input
                ref={userRef}
                  type="text"
                  name="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                  // required
                  value={user}
                  onChange={(e)=>{setUser(e.target.value)}}
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
                  required
                  value={pwd}
                  onChange= {(e)=>{setPwd(e.target.value)}}
                />
              </div>
              <div className="flex items-center justify-between">
                
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full text-bg-primary-600 font-bold bg-white hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500"> <Link to='/register'>Sign up</Link></a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login
