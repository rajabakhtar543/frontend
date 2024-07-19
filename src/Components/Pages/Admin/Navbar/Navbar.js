import React from 'react'
import './Navbar.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from '../../../../Context/auth';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';



function Navbar(props) {
 const [Auth,setAuth] = useAuth()
 
 const handleLogout = ()=>{
   setAuth({...Auth,
     user:null,
     token:''})
     localStorage.removeItem('auth')
     toast.success('Logout Successfully')
      }
    return (
        <>
      <nav className="navbar navbar2 navbar-expand-med navbar-light bg-light  d-flex justify-content-between align-items-center sticky-top col">
    <div>
        <i className=" icon bi-justify-left h3" onClick={props.Toggle}></i>
    </div>

    <div class="dropdown">
  {/* <button class="btn btn-dark buttoncolor dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
{Auth?.user?.name}
  </button> */}
  <div className="dropdown">
    <NavLink className="btn navbtn dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
      {Auth?.user?.name}
    </NavLink>
    <ul className="dropdown-menu">

  <li><NavLink to="/" className="dropdown-item">Go to Site</NavLink></li>
  <li><NavLink to="/Login" className="dropdown-item" onClick={handleLogout}>Logout</NavLink></li>


      </ul>
 </div>
</div>
</nav>

    </>
        
      );
    };
    
    export default Navbar;