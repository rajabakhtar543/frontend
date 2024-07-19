import React from 'react'
import Layout from '../../Layout/Layout'
import ".//Contact.css"

const Contact = () => {
  return (
    <>

    <Layout>
   <section className="contact">
  <div className="content">
    <h2>Contact Us</h2>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro similique doloribus consectetur a hic cum voluptas, consequuntur doloremque perspiciatis atque temporibus corrupti voluptatum! Nulla assumenda quam cumque esse distinctio? Quis!</p> 
  </div>
  <div className="container">
    <div className="contactinfo">
      <div className="box">
        <div className="icon"><i className="bi bi-geo-alt-fill" /></div>
        <div className="text">
          <h3>Address</h3>
          <p>GT Road Gujrat,<br />opposite to Anmol Harriage Hall</p>
        </div>
      </div>
      <div className="box">
        <div className="icon"><i className="bi bi-telephone-forward" /></div>
        <div className="text">
          <h3>Phone</h3>
          <p>0322-5584412</p>
        </div>
      </div>
      <div className="box">
        <div className="icon"><i className="bi bi-envelope" /></div>
        <div className="text">
          <h3>Email</h3>
          <p>Rajabhashim@gmail.com</p>
        </div>
      </div>
    </div>
    <div className="contactform">
      <form>
        <h2>Send Message</h2>
        <div className="inputbox">
          <input type="text" name required="required" />
          <span>Full Name</span>
        </div>
        <div className="inputbox">
          <input type="text" name required="required" />
          <span>Email</span>
        </div>
        <div className="inputbox">
          <textarea required="required" defaultValue={""} />
          <span>Type your Message...</span>
        </div>
        <div className="inputbox">
          <input type="submit" name defaultValue="Send" />
          <span />
        </div>
      </form>
    </div>
  </div>
</section>

    </Layout>
      
    </>
  )
}

export default Contact
