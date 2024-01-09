
import { useSelector } from "react-redux"
import king from "../Assets/king-high-resolution-logo-2.jpg"
import { RootState } from "../store/store"
import { Link } from "react-router-dom"
import useLogout from "../hooks/useLogout"


const Header = () => {
    
    const auth = useSelector((state:RootState)=>state.auth);
    
    const logout = useLogout()
    
  return (
    <header className=' fixed top-0 w-full   bg-slate-800  text-white font-MerriWeather px-4  '>
        
        <div className=' flex max-w-7xl mx-auto pt-6 pb-1 justify-between'>
            
            
           
            
            <section className=' flex  items-center '>
                
                 <div className = "  flex items-center">
               
                    <img src={king} className=" h-11  object-fill " alt="" /> 
               
                </div>
                
               
                
               
                
            </section >
            
            <section className=" flex items-center">
                 <div className=" flex text-xl font-bold gap-5   text-[#c9d3d7]">
                    
                    <div className="hover:text-white hover:scale-110 cursor-pointer"><Link to='/'>Products</Link></div>
                    <div className="hover:text-white hover:scale-110 cursor-pointer"><Link to='/'>Services</Link></div>
                    <div className="hover:text-white hover:scale-110 cursor-pointer">Our Team</div>
                    <div className="hover:text-white hover:scale-110 cursor-pointer">Connect</div>
                    
                </div>
            </section>
            
            <section className='  transition-rounded duration-300  flex text-xl font-bold items-center  text-slate-900 gap-4 mr-2 px-6  rounded-3xl  bg-emerald-300 tex hover:rounded-lg '>
                
                {
                    auth ? <div className="cursor-pointer"><Link to='/profile'> {auth.user.split(' ')[0]}</Link> </div> : <div className="cursor-pointer"><Link to='/login'>Login</Link></div>
                }
                
                {/* {
                    auth?<div className="cursor-pointer " onClick={ async()=>{await logout()}}>Logout</div>:''
                } */}
                
               
                
            </section>
            
        </div>
        
      
        
    </header>
  )
}

export default Header
