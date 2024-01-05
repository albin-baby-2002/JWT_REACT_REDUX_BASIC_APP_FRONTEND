import { useRef, useState, useEffect, FormEvent } from "react";
import { faCheck, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthType } from "../context/authContext";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{0,23}( [A-Za-z][A-Za-z0-9-_]{0,23})?$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  
    const {auth} = useAuth() as AuthType
    
    const navigate = useNavigate()
    
    const userRef = useRef<HTMLInputElement>(null);
  

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
  

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);


    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
 

    const [errMsg, setErrMsg] = useState('');
    
    useEffect(()=>{
        
        userRef.current?.focus();
        
        console.log(auth);
        
        
    },[])
    
    useEffect(()=>{
        
        setValidName(USER_REGEX.test(user));
        
    },[user])
    
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])
    
    useEffect(()=>{
        
        setErrMsg('')
    },[user,pwd,matchPwd])
    
    const handleSubmit = async(e:FormEvent)=>{
        
        e.preventDefault();
        
        console.log('submit');
        
        
        
        if(!validName || !validPwd || !validMatch || !user || !pwd || !matchPwd){
            
            setErrMsg('invalid Credentials')
            
            return
        }
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
          
            console.log(JSON.stringify(response?.data));
            navigate('/login')
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err:any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            
        }
    }
    
    

    
  return  (
    <section className="bg-gray-500 dark:bg-gray-900 min-h-screen pt-5">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen-screen  pt-5 ">
        
        <p className={errMsg?"mb-7 flex  items-center justify-between  bg-red-300  min-w-[300px] px-4 py-1 rounded-md font-mono":"hidden "}>Error: {errMsg} <FontAwesomeIcon onClick={()=>{setErrMsg('')}} icon={faXmark} className=" cursor-pointer "/></p>
       
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
              
              <button 
              disabled={!validName || ! validPwd || !validMatch ? true:false}
                type="submit"
                className="w-full text-bg-primary-600 font-bold bg-white hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mx-auto  w-max">
                Already have an account? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500"> <Link to='/login'>Login here</Link></a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register
