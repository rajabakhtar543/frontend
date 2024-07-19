import React from 'react'
import Layout from '../../Layout/Layout'

import "./About.css"

const About = () => {
  return (
    <>
     <Layout>
 <section className="hero">
  <div className="heading">
    <h1>About Us</h1>
  </div>

   <div className="container">
  <div className="hero-content">
    <h2>Welcome To Our Website</h2>
    <p>We understand that product can be overwhelming with its wide range of options and varying quality. That's why we've curated a selection of products that meet our high standards for quality, value, and sustainability. Each product in our collection is carefully chosen and rigorously tested to ensure that it meets our customers' needs and exceeds their expectations.
      We are also committed to providing exceptional customer service. Our team of experts is always available to answer any questions you may have and to help you find the perfect products  for your needs. We believe in building long-term relationships with our customers, and we are dedicated to providing the best possible shopping experience from start to finish.
      Thank you for choosing us as your trusted partner. We're excited to be part of your journey.</p>
    <button className="cta-button">Learn More</button>
  </div>
  <div className="hero-image">
    <img src="depositphotos_104648666-stock-photo-group-of-people-brainstorming-on.jpg" alt />
  </div>
</div>
</section>


      </Layout>
    </>
  )
}

export default About
