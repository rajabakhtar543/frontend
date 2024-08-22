import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/api/v1/order/sales-data');
        if (response.data.success) {
          setSalesData(response.data.salesData.map(item => ({
            day: item._id,
            totalRevenue: item.total,
            orderCount: item.orderCount,
          })));
        } else {
          console.error("Error fetching sales data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ value: 'Day of Month', position: 'insideBottomRight', offset: -5 }} />
        <YAxis label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="orderCount" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
