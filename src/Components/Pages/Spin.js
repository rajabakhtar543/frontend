import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import "./Spin.css"

const Spinner = ({path="Register"}) => {
    const[count,setcount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        const interval=setInterval(()=>{
            setcount((prevValue)=> --prevValue)

        },1000)
        count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
        })
        return ()=> clearInterval(interval)
    },[count,navigate,location,path])
  return (
    <>
    <div className='loaderbody'>
    <div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
<h5 className='text'>You Will Be Redirecting in {count} seconds</h5>
</div>

    </>
  )
}

export default Spinner
