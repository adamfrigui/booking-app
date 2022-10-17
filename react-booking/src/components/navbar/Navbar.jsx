import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { AuthContext } from '../../context/AuthContext'



const Navbar = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/"> <span className="logo">Test</span></Link>
        {user ? user.details.username : <div className="navItems">
          <button className="navButton">Register</button>
          <Link to="/login"><button className="navButton">Login</button></Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar