
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <h1>Welcome home <Link to='/admin'>admin</Link> </h1>
      
      <Link to='/users'>users</Link>
      
      
    </div>
  )
}

export default Home
