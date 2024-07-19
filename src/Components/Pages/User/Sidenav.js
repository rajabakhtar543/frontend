import React from 'react'
import "./Dashboard.css"
import { NavLink } from 'react-router-dom'
import "./Sidenav.css"
const Sidenav = () => {
  return (
    <>
    <div class="sidenav">
    <NavLink to='/Dashboard/user' className="nav-link active text-white">
                <i className="icon bi-speedometer mr-2 h4"></i>
                <strong className="h4"> Profile</strong>
              </NavLink>

              <NavLink to='/Dashboard/user/orders' className="nav-link text-white">
                <i className="icon bi-clipboard-check-fill h4 m-1 "></i>
                <strong className="h4 m-1">Orders </strong>
              </NavLink>

  </div>
    </>
  )
}

export default Sidenav
