import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserOrders.css';
import { useAuth } from '../../../Context/auth';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = auth?.user?._id;
        
        if (!userId) {
          throw new Error("User ID is missing");
        }
  
        const { data } = await axios.post("/api/v1/order/orders", 
          { Id:userId },
        
        );
  
        console.log("Received orders:", data);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };
  
    if (auth?.user?._id && auth?.token) {
      fetchOrders();
    } else {
      console.log("Missing user ID or token:", { userId: auth?.user?._id, hasToken: !!auth?.token });
    }
  }, [auth?.user?._id, auth?.token]);

//   const calculateOrderTotal = (order) => {
//     return order.products.reduce((total, product) => {
//       return total + (product.DiscountedPrice * product.quantity);
//     }, 0)
//   };
// const calculateTotalAmount =
   
    
//     orders.map((o)=>o.products.reduce((total, item) => {
//       const price = Number(item.Discountedprice) || 0;
//       const quantity = Number(item.quantity) || 0;
//       return total + (price * quantity);
//     }, 0));
  

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-orders">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th> ID</th>
                <th>Products</th>
                <th>Date</th>
                
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td data-label="ID">#{order._id}</td>
                  <td data-label="Products">
                    <div className="product-info">
                      {order.products.map((product, index) => (
                        <div key={index} className="product-item">
                          <img src={product.photos[0]} className="product-image" />
                          <span>
                           (${product.Discountedprice}x{product.quantity}=${product.Discountedprice*product.quantity})
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
                 
                  <td data-label="Status">
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserOrders;