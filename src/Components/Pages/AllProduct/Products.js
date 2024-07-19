
import Layout from '../../Layout/Layout'
import React, { useState, useEffect } from "react";


import axios from "axios";
import { Checkbox, Radio } from "antd";



import { useAuth } from '../../../Context/auth';
import { Price } from '../Price';
import "./Products.css"
import SearchForm from '../../Form/SearchForm';
import { useCart } from '../../../Context/cart';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';


const Products = () => {
  
 const [cart ,setCart] = useCart([]);
  const[Auth,setAuth]= useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
   <>
   <Layout>
    <div className="containers">
   <div className="container-fluid row mt-3">
       
        <div className="col-md-12">
          
          <SearchForm className='search'/>
          <div className="d-flex flex-wrap pro-container" id='product-1'>
          <div className="small-container">
<section id="product-1" className="section-p1">
    <h2 className='titles'>All Products</h2>
   
    <div className="pro-container ">
    {products.map(p => (
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
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
   </Layout>
   </>
  );
};

export default Products
