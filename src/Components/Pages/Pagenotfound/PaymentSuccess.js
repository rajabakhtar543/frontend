import React from 'react'
import './Payment.css'
import{Link} from 'react-router-dom'

const Paymentsuccess = () => {
  return (
    <>
      
    <div className="pnf">
      <h1 className='pnf-title'><i className='icon bi-check-lg'></i></h1>
      <h3 className='pnf-heading'>Payment is successfully</h3>
      <Link to = '/' className='pnf-button'>
        GO BACK
      </Link>
    </div>
      
    </>
  )
}

export default Paymentsuccess
