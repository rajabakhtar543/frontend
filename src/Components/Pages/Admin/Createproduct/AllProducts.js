import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

import "./Allproduct.css"
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [Products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/get-product');
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar className="stcky-left" />
        </div>
        <div className="col-md-9">
          <Navbar />
          <h1>All Products</h1>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr className='text-center table-dark'>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Availability</th>
             
                  <th>Update</th>
                  
                </tr>
              </thead>
              <tbody>
             
                {Products?.map((p) => (
                 
                  <tr key={p._id} className='text-center'>
                    <td>
                      <img
                        src={p.photos[0]}
                        alt={p.name}
                        className="product-image"
                      />
                    </td>
                    <td>{p.name.length > 30 ? `${p.name.substring(0, 30)}....` : p.name}</td>
                    <td>${p.Discountedprice}</td>
                    <td>{p.description && p.description.length > 60 ?`${p.description.substring(0, 60)}....`:p.description}</td>
                    <td>{p.stock && p.stock === true ? "In Stock" : "Out Of Stock"}</td>

                 
                    <td> <Link className='text-decoration-none text-white p-0'  to={`/dashboard/admin/products/${p.slug}`}><button className='navbtn p-1'>Update</button></Link></td>

                  </tr>
                 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
