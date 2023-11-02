import React from 'react'
import {Link} from "react-router-dom"
function Navbar() {
  return (
    <div className='navbar'>
        <div className='leftSide'>
            <Link to="/">
              <img src="/logo192.png" alt="Logo" />
            </Link>
            <Link to="/SendInformation">SendInformation</Link>
            <Link to="/RequestQueue">RequestQueue</Link>
        </div>
        <div className='rightSide'></div>
    </div>
  )
}

export default Navbar