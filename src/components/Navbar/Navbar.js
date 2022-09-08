import React, { useState } from 'react'
import './styles.css'
import './mobile.css'
import { Link } from 'react-router-dom'
import logo1 from '../../assets/tickitz-logo.png'
import { FaTimes } from "react-icons/fa";
import { RiMenu3Line } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { AuthLogout } from '../../redux/actions/Auth'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const {isLogin} = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className='nav-logo'><img src={logo1} alt="tickitz" /></Link>
          <div className={toggle ? "nav-menu active" : "nav-menu"}>
            <div className="nav-links left"><Link to="/">Home</Link></div>
            <div className="nav-links"><Link to="/movies">List Movies</Link></div>
            <Link to="/signin"><button className='btn-su'>Sign In</button> </Link>
            <p>© 2020 Tickitz. All Rights Reserved</p>
          </div>
          <div className="nav-menu">
            {isLogin ? <button onClick={() => {
              alert('Logout Succes')
              dispatch(AuthLogout())
            }}>Logout</button> : <Link to="/signin"><button>Sign In</button></Link>}
          </div>
          <div className="nav-icon" onClick={() => setToggle(!toggle)}>
            {toggle ? <FaTimes /> : <RiMenu3Line />}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar