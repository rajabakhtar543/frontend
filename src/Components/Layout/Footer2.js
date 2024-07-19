import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import Logo from './Pics/Logo.png'
import D1 from './Pics/D0.png'
import D2 from './Pics/D1.png'
const Footer2 = () => {
  return (
    <> 
    <div className="footer">
  <div className="container">
    <div className="rows">
      <div className="footer-col-1">
        <h3>Download Our App</h3>
        <p>Download App For Android And iOS mobile phone</p>
        <div className="app-logo">
          <img src={D1} alt="Android App" />
          <img src={D2} alt="iOS App" />
        </div>
      </div>
      <div className="footer-col-2">
        <img src={Logo} alt="Company Logo" />
        <p>Our Purpose Is To Provide Valuable Products To Our Customers To Make Them Happy</p>
      </div>
      <div className="footer-col-3">
        <h3>Useful Links</h3>
        <ul>
          <li><Link className='link' to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link className='link' to="/about-us">About Us</Link></li>
          <li><Link className='link' to="/return-policy">Return Policy</Link></li>
          <li><Link className='link' to="/disclaimer">Disclaimer</Link></li>
        </ul>
      </div>
      <div className="footer-col-4">
        <h3>Follow Us</h3>
        <ul>
          <li><a className='link' href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a className='link' href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a className='link' href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a className='link' href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="copyright">
    <p>Copyright © 2024 Body Store. All rights reserved.</p>
  </div>
</div>
    </>
  );
}

export default Footer2
