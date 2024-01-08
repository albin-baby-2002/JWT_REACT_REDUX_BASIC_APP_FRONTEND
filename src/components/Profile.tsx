
import profileImg from '../Assets/profile img.jpeg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFileUpload} from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
  return (
    <div className=" bg-slate-900  flow-root h-full">
        
        <div className=' text-right text-white font-bold  pt-6 cursor-pointer hover:opacity-80 w-[90%]  pr-4 mx-auto '>Logout</div>
    
        
        
        <div className="  w-[90%]  h-96 mx-auto border-2 rounded-lg border-emerald-300 relative mt-12 ">
            
            <h1 className=" absolute bg-slate-900 px-4  text-5xl text-[#c9d3d7]  font-MerriWeather mt-7 left-1/2 -top-8 transform -translate-x-1/2 -translate-y-1/2"> Profile Page </h1>
            
            <div className=' h-full px-8 flex  items-center'>
                
                <div className=' border-r-2 px-4 w-1/2 flex justify-center  rounded-md'>
                    
                    
                    <div className=' relative'>
                        <img src={profileImg} className='rounded-md ' alt="" />
                        
                        <FontAwesomeIcon className=' absolute top-0 px-3 cursor-pointer mr-2 rounded-lg py-2 mt-2  bg-slate-950 hover:opacity-80 text-white right-0 h-4' icon={faFileUpload}></FontAwesomeIcon>
                    </div>
                
                
                    
                </div>
                
                <div className=' flex flex-col gap-5 w-1/2  px-16 text-white  '>
                        
                        
                        <div className=' flex w-full text-2xl'>
                            
                    
                            <p> Albin Baby</p>
                        </div>
                        <div className=' flex w-full'>
                            
                            <p> Email : </p>
                    
                            <p className=' ps-2'> albinbtg@gmail.com</p>
                        </div>
                        <div className=' flex w-full'>
                            
                            <p> Phone : </p>
                    
                            <p className=' ps-2'> 65986232323</p>
                        </div>
                    
                    
                </div>
                
            </div>
            
            
             
        </div>
      
    </div>
  )
}

export default Profile
