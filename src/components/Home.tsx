
import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'


const Home = () => {
  
  const logout = useLogout()
  
  return (
    <div>
      <h1>Welcome home <Link to='/admin'>admin</Link> </h1>
      
      <Link to='/users'>users</Link>
      
      <p onClick={ async()=>{await logout()}}>Logout</p>
      
      
    </div>
  )
}

export default Home
