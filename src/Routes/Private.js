import React,{useState,useEffect} from 'react'
import { useAuth } from '../Context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Components/Pages/Spin'

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [Auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get("/api/v1/auth/auth-login");
        if (res.data.ok) {
          setOk(true); 
        } else {
          setOk(false);
        }
      };
      if (Auth?.token) authCheck();
    }, [Auth?.token]);
  
    return ok ? <Outlet /> : <Spinner />;
  }

  export { PrivateRoute }; 
  





