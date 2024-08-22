import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'



const AdminDashboard = () => {
  return (
 
    <div className="row">
      <div className="col-md-3">
       <Sidebar/>
      </div>
      <div className="col-md-9">
      <Navbar />
      <div><h1>Dashboard</h1></div>

      </div>
    </div>

   
  )
}

export {AdminDashboard}
