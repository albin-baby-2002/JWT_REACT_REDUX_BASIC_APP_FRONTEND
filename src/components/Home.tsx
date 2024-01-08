
import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { RootState } from '../store/store'
import {  useSelector } from 'react-redux'
import Header from './Header'




const Home = () => {
  
  const auth = useSelector((state:RootState)=>state.auth);
  
  // console.log('auth state from home : ',auth)
  
  const logout = useLogout()
  
  return (
    
    <>
    <Header/>
    
    <main className='  bg-slate-800 h-screen flow-root px-16'>
      
      <div className='  flex flex-col gap-5 text-left font-bold   h-screen  justify-center text-5xl  px-1 max-w-7xl mx-auto text-white font-mono'> 
      
          <div>
            
            Get The Best The World Has To offer
            
          </div> 
          
          <div className='  text-7xl text-emerald-200'>
            
            Here At Kings
            
          </div>
        
      </div>
      
      
  
    </main>
    
    </>
  )
}

export default Home
