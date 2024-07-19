import React  from 'react';
import Layout from '../../Layout/Layout';
import "./Dashboard.css";

import UserDetails from './UserDetails';
import UserOrders from './UserOrders';

const Dashboard = () => {
 
  
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2023-01-01',
    };
  
    // Mock order data (replace with actual data fetching logic)
    const orders = [
      { id: 1, date: '2024-07-10', total: 99.99, status: 'Delivered' },
      { id: 2, date: '2024-07-05', total: 149.99, status: 'Shipped' },
      { id: 3, date: '2024-06-30', total: 79.99, status: 'Processing' },
    ];

  return (
    <>
      <Layout>
  

 


    <div className="dashboard">
      <UserDetails user={user} />
      <UserOrders orders={orders} />
    </div>



       
      </Layout>
    </>
  )
};

export default Dashboard;
