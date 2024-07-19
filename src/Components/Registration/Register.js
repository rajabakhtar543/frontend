import Layout from '../Layout/Layout';
import './Register.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { React, useState } from 'react';
import toast from 'react-hot-toast';
import img from "../Signin/pictures/file.png";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [Auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register', { name, email, password, address, phone });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/Register');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  const handleSubmits = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...Auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  return (
    <Layout>
      <div className="account-page">
        <div className="container">
          <div className="rows">
            <div className="cols-2">
              <img src={img} style={{ width: "70%" }} alt="form illustration"  className='imgs1'/>
            </div>
            <div className="cols-2">
              <div className="form-container">
                <div className={`form-btn ${showLogin ? 'show-login' : 'show-register'}`}>
                  <span onClick={() => setShowLogin(true)}>Login</span>
                  <span onClick={() => setShowLogin(false)}>Register</span>
                  <div className="underline" style={{ left: showLogin ? '72px' : '170px' }}></div>
                </div>
                <form id="login-form" className={showLogin ? 'show' : ''} onSubmit={handleSubmits}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span2 className="input-group-text"><i className="icon bi-person"></i></span2>
                    </div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control input_user" placeholder="Email" required />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span2 className="input-group-text"><i className="icon bi-key"></i></span2>
                    </div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control input_pass" placeholder="Password" required />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customControlInline" />
                      <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" name="button" className="btn">Login</button>
                  </div>
                  <div className="mt-4">
                <div className="d-flex justify-content-center links">Don't have an account?   <Link to="#" className="ml-2" onClick={() => setShowLogin(false)}>Sign Up</Link></div>
                <div className="d-flex justify-content-center links">
                    <Link to="/forget">Forgot your password?</Link>
                </div>
            </div>
     
                </form>
                <form id="register-form" className={!showLogin ? 'show' : ''} onSubmit={handleSubmit}>
                  <div className="form-group input-group mb-2">
                    <div className="input-group-prepend">
                      <span2 className="input-group-text"><i className="icon bi-person"></i></span2>
                    </div>
                    <input name="" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Full name" type="text" required />
                  </div>
                  <div className="form-group input-group mb-2">
                    <div className="input-group-prepend">
                      <span2 className="input-group-text"><i className="icon bi-envelope"></i></span2>
                    </div>
                    <input name="" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email address" type="email" required />
                  </div>
                  <div className="form-group input-group mb-2">
                    <div className="input-group-prepend">
                      <span2 className="input-group-text"><i className="icon bi-key"></i></span2>
                    </div>
                    <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" type="password" required />
                  </div>
                  <p style={{fontSize:"10px"}}>(*Your Order Will Be Shipped On this Address*)</p>
                  <div className="form-group input-group mb-2 ">
                    <div className="input-group-prepend">
                      <span2 className="input-group-text"><i className="icon bi-house"></i></span2>
                    </div>
                    <input name="" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Address" type="address" required />
                  </div>
                  <div className="form-group input-group mb-2 ">
                    <div className="input-group-prepend">
                      <span2 className="input-group-text"><i className="icon bi-phone"></i></span2>
                    </div>
                    <input  name="" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}  className="form-control" placeholder="03123456789"  required/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn register-btn">Create Account</button>
                  </div>
                  <p className="text-center">Have an account?   <Link to="#" className="ml-2" onClick={() => setShowLogin(true)}>Login</Link> </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Register;
