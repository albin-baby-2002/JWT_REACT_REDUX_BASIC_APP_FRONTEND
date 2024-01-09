
import profileImg from '../Assets/profile img.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faXmark} from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useEffect, useState } from 'react'
import useLogout from '../hooks/useLogout'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const PROFILE_DATA_URL = '/user/profile/data'

const PROFILE_IMG_URL = '/user/profile/image'

interface Profile_Info {
    
    username:string,
    email:string,
    phone:string,
    image:string
}

const Profile = () => {
    
    let isMounted = false;
    
    const logout = useLogout();
    
    const axiosPrivate = useAxiosPrivate()
    
    const [displayModal , setDisplayModal] = useState(false)
    
    const [fetchTrigger,setFetchTrigger] = useState(true)
    
    const [profile,setProfile] = useState<Profile_Info | null>(null)
    
    const [imageFile,setImageFile] = useState<File|null>(null)
    
    const handleImgUpload = async()=>{
        
        const formData = new FormData();
        
        if(imageFile){
            
             formData.append('profileImg',imageFile,imageFile.name)
             
             console.log(formData)
             
             const response = await axiosPrivate.post(PROFILE_IMG_URL,formData,{ headers: {
                 'Content-Type': 'multipart/form-data',
                }},)
                
                setDisplayModal(false)
                
                setFetchTrigger((prev)=>!prev)
        }
        
       
        
        
    }
    
     
    
    
    useEffect(()=>{
        
        isMounted= true;
        
        const controller = new AbortController();
        
        const getUserData = async ()=>{
            
            try{
               
                const response = await axiosPrivate.get(PROFILE_DATA_URL, {
                    headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
                });

                
                console.log('profile info',response.data)
                
               isMounted && setProfile(response?.data)
                
                
            }
            catch(err:any){
                
                 if(!err.response){
                console.error(err?.message)
                    
                }
                
                if(err?.response?.status === 401 || err?.response?.status === 403 ){
                     console.error(err?.response)
                    
                }
                
            }
            
           
            
        }
        
        getUserData()
        
        
        return ()=>{
            isMounted = false,
            controller.abort()
        }
        
    },[fetchTrigger])
    
  return (
    <div className=" bg-slate-900  relative flow-root h-full">
        
        <div className=' text-right text-white font-bold  pt-6 cursor-pointer hover:opacity-80 w-[90%]  pr-4 mx-auto ' 
        onClick={async()=>{  logout()}}>Logout</div>
    
        
        
        <div className="  w-[90%]  h-96 mx-auto border-2 rounded-lg border-emerald-300 relative mt-12 ">
            
            <h1 className=" absolute bg-slate-900 px-4  text-5xl text-[#c9d3d7]  font-MerriWeather mt-7 left-1/2 -top-8 transform -translate-x-1/2 -translate-y-1/2"> Profile Page </h1>
            
            <div className=' h-full px-8 flex  items-center'>
                
                <div className=' border-r-2 px-4 w-1/2 flex justify-center  rounded-md'>
                    
                    
                    <div className=' relative'>
                        <img src={`http://localhost:3000/public/img/profileImages/${profile?.image}`} className='rounded-md  h-48 ' alt="" />
                        
                        <FontAwesomeIcon onClick={()=>{setDisplayModal(true)}}  className=' absolute top-0 px-3 cursor-pointer mr-2 rounded-lg py-2 mt-2  bg-slate-950 hover:opacity-80 text-white right-0 h-4' icon={faFileUpload}></FontAwesomeIcon>
                    </div>
                
                
                    
                </div>
                
                <div className=' flex flex-col gap-5 w-1/2  px-16 text-white  '>
                        
                        
                        <div className=' flex w-full text-2xl'>
                            
                    
                            <p> {profile?.username}</p>
                        </div>
                        <div className=' flex w-full'>
                            
                            <p> Email : </p>
                    
                            <p className=' ps-2'> {profile?.email}</p>
                        </div>
                        <div className=' flex w-full'>
                            
                            <p> Phone : </p>
                    
                            <p className=' ps-2'> {profile?.phone}</p>
                        </div>
                    
                    
                </div>
                
            </div>
            
            
             
        </div>
        
        
        <div className={`${displayModal?'flex':'hidden'} absolute w-full h-full  top-0  bg-slate-900/30  items-center justify-center`}>
            <div  className='   min-h-60  min-w-96 bg-black rounded-md text-white '>
                
                <div className=' flex justify-end text-xl mr-5 pt-5'>
                    <FontAwesomeIcon className=' cursor-pointer' onClick={()=>{setDisplayModal(false)}} icon={faXmark}></FontAwesomeIcon>
                </div>
                
                <div className=' flex  flex-col justify-center items-center'>
                <p className=' text-center py-3 font-bold'> Img Upload</p>
                
                <input className='  border-2 border-white mt-3' type="file" onChange={(event:ChangeEvent<HTMLInputElement>)=>{ setImageFile( event.target.files?.[0] || null)}} />
                
                <button onClick={()=>{handleImgUpload()}} className=' mt-8   bg-slate-900 px-4  py-2 rounded-lg hover:outline outline-2 outline-offset-2 outline-white '>UPLOAD IMAGE</button>
                    
                </div>
                
            
            
            
        </div>
            
        </div>
        
      
    </div>
  )
}

export default Profile
