import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../Context/auth';
import "./Homepage.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../../../Context/cart';
import Header from '../../Layout/Header';
import img2 from './pictures/img1.png';
import T1 from './pictures/T2.png';
import L1 from './pictures/L1.png';
import L2 from './pictures/L2.png';
import L3 from './pictures/L3.png';
import L4 from './pictures/L4.png';
import L5 from './pictures/L5.png';
import { NavLink } from 'react-router-dom';
import Footer2 from '../../Layout/Footer2';

const Homepage = () => {
  const [cart, setCart] = useCart({});
  const [Auth, setAuth] = useAuth();
  const [Products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
 

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get('/api/v1/category/all-category');
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong In getting Category');
      }
    };

    getAllCategory();
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await axios.post('/api/v1/product/get-product');
        setProducts(data?.product);
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
      }
    };

    getAllProducts();
  }, []);

  const bestSellerCategory = Categories.find(cat => cat.name === "Best Seller");

  const bestsellerProducts = bestSellerCategory
    ? Products.filter(p => p.category.some(c => c._id === bestSellerCategory._id))
    : [];

  const newarrivalCategory = Categories.find(cat => cat.name === "New Arrival");

  const newarrivalProducts = newarrivalCategory
    ? Products.filter(p => p.category.some(c => c._id === newarrivalCategory._id))
    : [];

  const OfferBannerCategory = Categories.find(cat => cat.name === "Offer Banner");

  const Productoffer = OfferBannerCategory
    ? Products.filter(p => p.category.some(c => c._id === OfferBannerCategory._id))
    : [];

  return (
    <>
      <div className="contain">
        <div className="containers">
          <Header />
          <div className="rows">
            <div className="cols-2">
              <h1>Give Your Workout <br /> A New Style!</h1>
              <p>Success isn't always about greatness. It's about consistency. Consistent hard work gains success. Greatness will come.</p>
              <NavLink to="/Allproducts" className="buttons">Explore Now &#8594;</NavLink>
            </div>
            <div className="cols-2"><img src={img2} alt="" className='imgs1' /></div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="small-container">
        <section id="product-1" className="section-p1">
          <h2 className='titles'>Best Seller</h2>
          <div className="pro-container">
          {bestsellerProducts.slice(0, 8).map(p => (
              <div className="pro" key={p._id}>
                {p.photos.length > 0 && (
                  <img
                    src={p.photos[0]}
                    alt={p.name}
                    style={{ height: "250px", width: "248px" }}
                  />
                )}
                <div className="des">
                  <NavLink to={`/product/${p.slug}`} className="navlink">
                    <h5 className="h-4">
                      {p.name.length > 50 ? `${p.name.substring(0, 50)}....` : p.name}
                    </h5>
                  </NavLink>
                  <NavLink to={`/product/${p.slug}`} className="navlink">
                    <span>
                      {p.description && p.description.length > 60
                        ? `${p.description.substring(0, 60)}....`
                        : p.description}
                    </span>
                  </NavLink>
                  <div className="star">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  
                  <h4>${p.Discountedprice}</h4>
                  <p3>${p.Orignalprice}</p3>
                </div>
               
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* [OFFERS SECTION] */}
      {Productoffer.slice(0, 1).map((p) => (
        <div className="offer" key={p._id}>
          <div className="small-container">
            <div className="rows">
              <div className="cols-2">
                <img className="offer-img" src={p.photos[0]} />
              </div>
              <div className="colum">
                <p>Exclusively Available On Body Store</p>
                <h1>{p.name}</h1>
                <small>{p.description}</small>
                <NavLink to={`/product/${p.slug}`}><div className="buttons" >VIEW PRODUCT &#8594;</div></NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* New Arrivals */}
      <div className="small-container">
        <section id="product-1" className="section-p1">
          <h2 className='titles'>New Arrivals</h2>
          <div className="pro-container">
         
          {newarrivalProducts.slice(0, 8).map(p => (
              <div className="pro" key={p._id}>
                {p.photos.length > 0 && (
                  <img
                    src={p.photos[0]}
                    alt={p.name}
                    style={{ height: "250px", width: "248px" }}
                  />
                )}
                <div className="des">
                  <NavLink to={`/product/${p.slug}`} className="navlink">
                    <h5 className="h-4">
                      {p.name.length > 50 ? `${p.name.substring(0, 50)}....` : p.name}
                    </h5>
                  </NavLink>
                  <NavLink to={`/product/${p.slug}`} className="navlink">
                    <span>
                      {p.description && p.description.length > 60
                        ? `${p.description.substring(0, 60)}....`
                        : p.description}
                    </span>
                  </NavLink>
                  <div className="star">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  
                  <h4>${p.Discountedprice}</h4>
                  <p3>${p.Orignalprice}</p3>
                </div>
               
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="testimonials">
        <div className="small-container">
          <h1 className='titles'>Testimonials</h1>
          <div className="rows">
            <div className="cols-3">
              <i className="bi bi-chat-left-quote h2 test"></i>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquid sunt, sequi iusto perferendis eius repellendus eligendi voluptate deleniti, optio doloremque totam voluptas repellat consequuntur asperiores adipisci dolores fuga excepturi fugit quis.</p>
              <div className="star">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
              </div>
              <img src={T1} alt="" />
              <h3>Sean Parker</h3>
            </div>
            <div className="cols-3">
              <i className="bi bi-chat-left-quote h2 test"></i>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquid sunt, sequi iusto perferendis eius repellendus eligendi voluptate deleniti, optio doloremque totam voluptas repellat consequuntur asperiores adipisci dolores fuga excepturi fugit quis.</p>
              <div className="star">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
              </div>
              <img src={T1} alt="" />
              <h3>John Smith</h3>
            </div>
            <div className="cols-3">
              <i className="bi bi-chat-left-quote h2 test"></i>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquid sunt, sequi iusto perferendis eius repellendus eligendi voluptate deleniti, optio doloremque totam voluptas repellat consequuntur asperiores adipisci dolores fuga excepturi fugit quis.</p>
              <div className="star">
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
                <i className="bi bi-star-fill" />
              </div>
              <img src={T1} alt="" />
              <h3>Amella</h3>
            </div>
          </div>
        </div>
      </div>
                                          {/* Brands Logo */}
          <div className="brands">
            <div className="small-container">
              <div className="rows">
                <div className="col-5"><img src={L1} alt="" /></div>
                <div className="col-5"><img src={L2} alt="" /></div>
                <div className="col-5"><img src={L3} alt="" /></div>
                <div className="col-5"><img src={L4} alt="" /></div>
                <div className="col-5"><img src={L5} alt="" /></div></div></div></div>        

                                                                 
 <Footer2/>
    </>
  )
}

export default Homepage
