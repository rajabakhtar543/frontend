import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">

    <input type="text" className="form-control" placeholder='Create New Category' value={value} onChange={(e)=>setValue(e.target.value)} />
   
  </div> 
   

  <button type="submit" className="btn btn-primary">Submit</button>
</form> 
   
    </> 
  ) 
} 

export default CategoryForm








// import React,{useState,useEffect} from 'react'

// import { useAuth } from '../../../Context/auth'
// import "./Homepage.css"
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import Layout from '../../Layout/Layout'


// const Homepage = () => {
//   const[Auth,setAuth] = useAuth()
//   const [Products, setProducts] = useState([]);

//   //get all products
//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.post('/api/v1/product/get-product');
//       setProducts(data?.product);
//     } catch (error) {
//       console.log(error);
//       toast.error('Something Went Wrong');
//     }
//   };

//   //lifecycle method
//   useEffect(() => {
//     getAllProducts();
//   }, []);
//   return (
//     <>
//       <Layout>
//      <div>
  
//   <section id="hero">
//     <h4>Trade-in-offer</h4>
//     <h2>Super value deals</h2>
//     <h1>On all products</h1>
//     <p>save more with coupons & upto 50% off!</p>
//     <button>Shop Now</button>
//   </section>
//   <section id="feature" className="section-p1">
//   <div className="fe-box">
//     <img src="" alt width="200px" height="130px" />
//     <h6>Free Shipping</h6>
//   </div>
//   <div className="fe-box">
//     <img src="" alt width="200px" height="130px" />
//     <h6>Online Order</h6>
//   </div>
//   <div className="fe-box">
//     <img src="" alt width="200px" height="130px" />
//     <h6>Save Money</h6>
//   </div>
//   <div className="fe-box">
//     <img src="" alt width="200px" height="130px" />
//     <h6>Promotion</h6>
//   </div>
//   <div className="fe-box">
//     <img src="" alt width="200px" height="130px" />
//     <h6>Happy Sell</h6>
//   </div>
//   <div className="fe-box">
//     <img src="" alt width="200px" height="130px" />
//     <h6>F24/7 Support</h6>
//   </div>
// </section>
// <section id="product-1" className="section-p1">
//   <h2>Featured Products</h2>
//   <p>Summer Collection New Modern Design</p>

//   <div className="pro-container">
//   {Products.slice(0, 8).map((p) => (
//   <div className="pro" key={p._id}>
//     <img src={p.photo} alt={p.name} />
//     <div className="des">
//       <span>{p.description}</span>
//       <h5>{p.name}</h5>
//       <div className="star">
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//       </div>
//       <h4>${p.price}</h4>
//     </div>
//     <a href="#"><i className="bi bi-cart2 cart" /></a>
//   </div>
// ))}

//     {/* Other product elements with empty image src */}
//   </div>
// </section>
// <section id="banner" className="section-m1">
//   <h4>Repair Services</h4>
//   <h2>Up to <span>50% Off </span>- All t-shirts & Accessories</h2>
//   <button>Explore More</button>
// </section>
// <section id="product-1" className="section-p1">
//   <h2>New Arrivals</h2>
//   <p>Summer Collection New Modern Design</p>
//   <div className="pro-container">
//   {Products.slice(0, 8).map((p) => (
//   <div className="pro" key={p._id}>
//     <img src={p.photo} alt={p.name} />
//     <div className="des">
//       <span>{p.description}</span>
//       <h5>{p.name}</h5>
//       <div className="star">
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//         <i className="bi bi-star-fill" />
//       </div>
//       <h4>${p.price}</h4>
//     </div>
//     <a href="#"><i className="bi bi-cart2 cart" /></a>
//   </div>
// ))}

   
//     {/* Other product elements with empty image src */}
//   </div>
// </section>
// <section id="sm-banner" className="section-p1">
//   <div className="banner-box">
//     <h4>crazy deals</h4>
//     <h2>buy 1 get 1 free</h2>
//     <span>The best classic dress is on sale at cara </span>
//     <button className="white">Learn More</button>
//   </div>
//   <div className="banner-box banner-box2">
//     <h4>spring/summer</h4>
//     <h2>upcoming season</h2>
//     <span>The best classic dress is on sale at cara </span>
//     <button className="white">Collection</button>
//   </div>
// </section>
// <section id="banner3">
//   <div className="banner-box">
//     <h2>SEASONAL SALE</h2>
//     <h3>Winter Collection- 50% Off</h3>
//   </div>
//   <div className="banner-box banner-box2">
//     <h2>NEW FOOTWEAR COLLECTION</h2>
//     <h3>Spring / summer 2024</h3>
//   </div>
//   <div className="banner-box banner-box3">
//     <h2>T-SHIRTS</h2>
//     <h3>New Trendy Prints</h3>
//   </div>
// </section>
// <section id="newsletter" className="section-p1 section-m1">
//   <div className="news-text">
//     <h4>Sign Up For Newsletters</h4>
//     <p>Get E-mail updates about our latest shop and <span>special offer.</span> </p>
//   </div>
//   <div className="form">
//     <input type="text" placeholder="Your email address" />
//     <button>Sign Up</button>
//   </div>
// </section>
// </div>



//       </Layout>
//     </>
//   )
// }

// export default Homepage

