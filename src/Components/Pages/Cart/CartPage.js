import React, { useState,useEffect  } from "react";

import "./cart.css";
import { useAuth } from "../../../Context/auth";
import { useCart } from "../../../Context/cart";
import { loadStripe } from "@stripe/stripe-js";

// import { useNavigate } from 'react-router-dom';

import axios from "axios";
import Header from "../../Layout/Header";
import Footer2 from "../../Layout/Footer2";

import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const CartPage = () => {
  const[name,Setname]=useState('')
const[email,Setemail]=useState('')
const[phone,Setphone]=useState('')
const[address,Setaddress]=useState('')
  const [Auth] = useAuth();
  const [cart, setCart] = useCart();
  useEffect(() => {
    if (Auth?.token ) {
      Setemail(Auth?.token && Auth?.user?.email);
      Setname(Auth?.token && Auth?.user?.name);
      Setphone(Auth?.token && Auth?.user?.phone);
      Setaddress(Auth?.token && Auth?.user?.address);
    }
  }, [Auth?.token && Auth?.user?.email]);


  const handleOnChange = (event, productId) => {
    const value = parseInt(event.target.value);
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: value } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
   // const navigate = useNavigate();
   const totalAmount = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.Discountedprice * (item.quantity || 1); // Calculate total price based on quantity
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };


  const makePayment = async () => {
    if(Auth.token){
    
    const stripePromise = await loadStripe("pk_test_51P0iAxP7qR7euE4cB68YYfQV8teDqpkJYDk8yBP7X1148YeDu9BbXrqvXf16Q7bHZa8YK7tYWPjozp8FGN4HvrVV004RSAaQgC");
    const stripe = stripePromise;

    const body = {
        cart: cart.map(item => ({
            name: item.name,
            Discountedprice: item.Discountedprice,
            photos: item.photos,
            quantity: item.quantity || 1,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
        })),
        user: Auth.user,
    };

    try {
        const response = await axios.post("/api/v1/order/payments", body);
        if (response.data.success) {
            toast.success(response.data.message);

            localStorage.removeItem("cart"); // Clear the cart from local storage
        } else {
            toast.error(response.data.message);
        }

        const { client_secret, session_id } = response.data;

        const result = await stripe.redirectToCheckout({ sessionId: session_id });

        if (result.error) {
            console.log(result.error);
        }
    } catch (error) {
        console.error("Payment error:", error);
    }}
    else{
    
      toast.error("please login to checkout") 
    }
};

  return (
    <>
      <div className="containers">
        <Header />
        <div className="col-md-12">
          <h1 className="text-center p-2 mb-1">
          {Auth?.token ? `Hello ${Auth?.user?.name}` : "Please Login To Checkout"}
          </h1>
          <h4 className="text-center">
            {cart?.length
              ? `You Have ${cart.length} items in your cart`
            
              : " Your Cart Is Empty"}
          </h4>
        </div>

        <div className="small-container cart-page">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Total Prize</th>
                <th>Remove</th>

              </tr>
            </thead>
            <tbody>
              {cart?.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="cart-info">
                    <img src={p.photos[0]} />

                      <div className="info-p">
                        <p className="p">
                          {p.name.length > 50
                            ? `${p.name.substring(0, 50)}....`
                            : p.name}
                        </p>
                         <div className="d-flex information">
                        <small>price:${p.Discountedprice}</small>
                        
                        <p3>${p.Orignalprice}</p3>
                        
                        <p2>Size: {p.selectedSize}</p2>
                   
                        <p2>Color: {p.selectedColor}</p2>
                      
                        </div>
                    
                      </div>
                    </div>
                  </td>
                  <td>
                  <input
                      type="number"
                      min={1}
                      value={p.quantity || 1}
                      onChange={(e) =>
                        handleOnChange(e, p._id)
                      }
                    />
                  </td>
                  <td>${p.Discountedprice * (p.quantity || 1)}</td>
                  <td>    <button
                          type="button"
                          onClick={() => removeCartItem(p._id)}
                          className="btns"
                          data-mdb-toggle="tooltip"
                          title="Remove p"
                        >
                          <i className="icon bi-trash" />
                        </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

     
      
       
      
            <div className="summary-content">
            <div className="summary-title">TOTAL BILL</div>
              <div className="summary-item">
                <span className="summary-label">Products:</span>
                <span className="summary-value">{cart.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total amount</span>
                <span className="summary-value">{totalAmount()}</span>
              
              
              </div>
              <div className="summary-item">
                <span className="summary-label">Name</span>
                <span className="summary-value">{name}</span>
              
              
              </div>
              <div className="summary-item">
                <span className="summary-label">Email</span>
                <span className="summary-value">{email}</span>
              
              
              </div>
              <div className="summary-item">
                <span className="summary-label">Phone</span>
                <span className="summary-value">{phone}</span>
              
              
              </div>
              <div className="summary-item">
                <span className="summary-label">Address</span>
                <span className="summary-value">{address}</span>
              
              
              </div>
             
                                               
        <NavLink to="/Dashboard/user">
            <button
         
            
              type="button"
              className=" m-3 p-2 bg-dark text-white "
            >
              Edit Details
            </button>
            </NavLink>
                                                                  
        
              <div className="summary-item">
                <span className="summary-label"></span>
                <button 
              onClick={makePayment}
              type="button"
              className=" buttons mt-5 "
            >
              Go to Checkout
            </button>
             
              
              </div>

            </div>
           
          </div>
        
     
      
      <Footer2 />
    </>
  );
};

export default CartPage;
