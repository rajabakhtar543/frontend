import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import moment from "moment";
import { Select, Card, Row, Col } from "antd";
import { useAuth } from "../../../../Context/auth";
const { Option } = Select;

const AdminOrders = () => {
  // ... (previous state and functions remain unchanged)
  const [status, setStatus] = useState([
    "NonStarted",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/order/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     
     <div className="home-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
            <h1 className="text-center mb-4">All Orders</h1>
            {orders?.map((o, i) => (
              <Card key={o._id} className="mb-4 shadow-sm">
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          style={{ width: '100%' }}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>
                        {o?.buyer?.name}<br />
                        {o?.buyer?.phone}<br />
                        {o?.buyer?.address}
                      </td>
                      <td>{new Date(o?.createdAt).toLocaleDateString()}</td>
                      <td>{o?.payment ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                      <td>${o?.total}</td>
                    </tr>
                  </tbody>
                </table>
                <Row gutter={[16, 16]} className="mt-3">
                  {o?.products?.map((p, i) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
                      <Card
                        hoverable
                        cover={
                          <img
                            src={p.photos[0]}
                            alt={p.name}
                            style={{ height: 200,width:190 ,objectFit: 'cover' }}
                          />
                        }
                      >
                        <Card.Meta
                          title={p.name}
                          description={
                            <>
                              <p>Price: ${p.Discountedprice}</p>
                              <p> FullPrice: ${p.Discountedprice* p.quantity}</p>
                              <p>Quantity: {p.quantity}</p>
                              <p>Color: {p.selectedColor}</p>
                              <p>Size: {p.selectedSize}</p>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            ))}
          </div>
        </div>
  
    </>
  );
};

export default AdminOrders;