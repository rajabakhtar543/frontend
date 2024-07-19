import React from 'react'
import { Link } from 'react-router-dom'
import "./Payment.css"
const Paymentcancel = () => {
  return (
    <>
       <div className="pnf">
      <h1 className='pnf-title'><i className='icon bi-x-lg red'></i></h1>
      <h3 className='pnf-heading'>Oops! Payment is Cancelled</h3>
      <Link to = '/' className='pnf-button'>
        GO BACK
      </Link>
    </div>
    </>
  )
}

export default Paymentcancel
