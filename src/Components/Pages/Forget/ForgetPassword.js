import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import img from './Favicon.png'
import "./Forgetpassword.css"
import axios from 'axios';
import {toast} from 'react-hot-toast';



const ForgetPassword =  () => {
    
        const [email, setEmail] = useState('');
        const [Message, setMessage] = useState('');


        const handlePasswordReset = async (e)=>{
            e.preventDefault()
        
          try {
            const response = await axios.post('/api/v1/auth/request-reset', { email });
            toast.success(setMessage)
            setMessage(response.data.message);
          } catch (error) {
            console.log('Error:', error);
            toast.success(setMessage)
            setMessage('Failed to send password reset email. Please try again later.');
          }
        ;
      
    }
    
      return (
        <>
        <Layout>
        <div className="container h-100 m-5">
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="user_card">
                <div className="d-flex justify-content-center">
                    <div className="brand_logo_container">
                        <img src={img} className="brand_logo" alt="Logo" />
                    </div>
                </div>
                <div className="d-flex justify-content-center form_container">
                    <form onSubmit={handlePasswordReset} >
                        <div className="input-group mb-3">
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="icon bi-person"></i></span>
                            </div>
                            <input type="Email"  value={email} onChange={(e) => setEmail(e.target.value)} className="form-control input_user" placeholder="Email" required/>
                        </div>
                       
                        <div className="d-flex justify-content-center mt-3 login_container">
                            <button type="submit" name="button" className="btn login_btn">ForgetPassword</button>
                        </div>
                    </form>
                </div>
                <div className="mt-4">
                    <div className="d-flex justify-content-center links">If You Remmember Your Password? <Link to="/Login" className="ml-2">Login</Link></div>
                   
                </div>
            </div>
        </div>
       
    </div>
    </Layout>
    </>
      );
    
      }
    
 


export default ForgetPassword
