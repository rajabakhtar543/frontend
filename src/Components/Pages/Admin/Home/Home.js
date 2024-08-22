import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import SalesChart from './Saleschart';

function Home() {
  const [total, setTotal] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  const getTotalOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/order-count");
      setTotalOrder(data?.totalOrder);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalOrders();
  }, []);

  const getTotalRevenue = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/total-revenue");
      setTotalRevenue(data?.totalRevenue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalRevenue();
  }, []);

  return (
    <>
      <div className="home-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="dashboard-cards mt-5">
            <div className="card">
              <div className="card-content">
                <span className='fs-3'>{total}</span>
                <p>Total Products</p>
              </div>
              <i className="bi bi-cart-plus"></i>
            </div>
            <div className="card">
              <div className="card-content">
                <span className='fs-3'>${totalRevenue}</span>
                <p>Total Revenue</p>
              </div>
              <i className="bi bi-cash"></i>
            </div>
            <div className="card">
              <div className="card-content">
                <span className='fs-3'>{totalOrder}</span>
                <p>Total Orders</p>
              </div>
              <i className="bi bi-box"></i>
            </div>
          </div>
          <h2 className='sales-overview'>Sales Overview</h2>
          <SalesChart />
        </div>
      </div>
    </>
  );
}

export default Home;
