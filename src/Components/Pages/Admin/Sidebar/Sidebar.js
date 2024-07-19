import React, {useState} from 'react'
import "./sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
const[open,setOpen] = useState(false)
const[Open,setopen] = useState(false)

const Dropdown = ()=>{
 setOpen(!open)
}
const Dropdowns = ()=>{
 setopen(!Open)
}

  return (
    <>
      <div className="sidebar vh-100 sticky-left">
           <div className="text-white p-4">
            <i className="icon bi-bag h2 p-1 "></i>
            <span className="brand-name fs-4 "><b>Ecommerce shop</b></span>
            </div>
           
        
   
        <hr className="text-white " />
        <div className="sidebar-sticky sidebar2 ">
          <ul className="nav flex-column my-1">
            <li className="nav-item my-1 ">
              <NavLink to='/Dashboard/admin' className="nav-link active text-white">
                <i className="icon bi-speedometer mr-2 h4"></i>
                <strong className="h4"> Dashboard</strong>
              </NavLink>
            </li>
            <li className="nav-item my-1">
              <NavLink to='/Dashboard/admin/create-category' className="nav-link text-white">
                <i className="icon bi-box mr-2 h4"></i>
                <strong className="h4"> Category</strong>
              </NavLink>
            </li>
            <li className="nav-item my-1">
              <div className="nav-link text-white"onClick={Dropdown}>
                <i className="icon  bi-caret-down mr-2 h4"></i>
                <strong className="h4 cursor-pointer" >Product</strong>
              </div>
          
            {open?  <div className="m-2 Dropdown">
            <li className="nav-item my-1">
              <NavLink to='/Dashboard/admin/create-product' className="nav-link text-white">
                <i className="icon bi-cart mr-2 h4"></i>
                <strong className="h4">Create Products</strong>
              </NavLink>
            </li>
            <li className="nav-item my-1">
              <NavLink to='/Dashboard/admin/products' className="nav-link text-white">
                <i className="icon bi-cart mr-2 h4"></i>
                <strong className="h4">All Products</strong>
              </NavLink>
            </li>
            </div>: <li></li>  }
            </li>
          
           
            <li className="nav-item my-1">
              <NavLink className="nav-link text-white">
                <i className="icon bi-person-fill mr-2 h4"></i>
                <strong className="h4"> Users</strong>
              </NavLink>
            </li>
            <li className="nav-item my-1">
              <NavLink to='/Dashboard/admin/orders' className="nav-link text-white">
                <i className="icon bi-clipboard-check-fill h4 m-1 "></i>
                <strong className="h4 m-1">Orders </strong>
              </NavLink>
            </li>
       
           
          </ul>
        </div>
        </div>
          
       
   
    </>
  );
}

export default Sidebar;
