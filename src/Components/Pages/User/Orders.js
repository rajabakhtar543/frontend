import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from '../../Layout/Layout'
import Sidenav from './Sidenav'
import moment from "moment";
import { useAuth } from '../../../Context/auth';


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const fetchOrders = async () => {
        try {
            const response = await axios.get("/api/v1/order/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            fetchOrders();
        }
    }, [auth?.token]);

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidenav />
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <h1 className="text-center">All Orders</h1>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <div className="border shadow" key={order._id}>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{order?.status}</td>
                                                    <td>{order?.buyer?.name}</td>
                                                    <td>{moment(order?.createdAt).fromNow()}</td>
                                                    <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{order?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {order?.products?.map((product) => (
                                                <div className="row mb-2 p-3 card flex-row" key={product._id}>
                                                    <div className="col-md-4">
                                                        <img
                                                            src={`/api/v1/product/product-photo/${product._id}`}
                                                            className="card-img-top"
                                                            alt={product.name}
                                                            width="100px"
                                                            height="100px"
                                                        />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <p>{product.name}</p>
                                                        <p>{product.description.substring(0, 30)}</p>
                                                        <p>Price: {product.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
