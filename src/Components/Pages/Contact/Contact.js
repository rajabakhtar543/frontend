import React from 'react';
import Layout from '../../Layout/Layout';
import './Contact.css';

const Contact = () => {
  return (
    <Layout>
      <div className="contact-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="contact-box p-4 text-center shadow-sm">
                <i className="bi bi-geo-alt-fill fs-1 text-primary mb-3" />
                <h4 className="mb-2">Address</h4>
                <p>Spall Town Gujrat Pakistan</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="contact-box p-4 text-center shadow-sm">
                <i className="bi bi-telephone-forward-fill fs-1 text-primary mb-3" />
                <h4 className="mb-2">Phone</h4>
                <p>+923124505738</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="contact-box p-4 text-center shadow-sm">
                <i className="bi bi-envelope-fill fs-1 text-primary mb-3" />
                <h4 className="mb-2">Email</h4>
                <p>rajabmalik907@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="form-map row">
            <div className="col-lg-6 mb-4">
              <form className="contact-form p-4 m-0 shadow-sm bg-white rounded">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your full name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email address" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows={5} placeholder="Type your message here" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Send Message</button>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="mapouter rounded overflow-hidden">
                <div className="gmap_canvas">
                  <iframe
                    width="100%"
                    height="400px"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder={0}
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
