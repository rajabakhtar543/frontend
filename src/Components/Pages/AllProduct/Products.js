import Layout from '../../Layout/Layout';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Spin, Card } from "antd";
import { useAuth } from '../../../Context/auth';
import "./Products.css";

import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import {  StarFilled } from '@ant-design/icons';
import SearchForm from '../../Form/SearchForm';
const { Meta } = Card;

const Products = () => {
 
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all categories
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

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      // If page is 1, replace the products; otherwise, append them
      setProducts(page === 1 ? data.products : [...products, ...data.products]);
    } catch (error) {
      setLoading(false);
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

  useEffect(() => {
    getAllProducts();
  }, [page]);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle filter by category
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
    if (!checked.length && !searchTerm) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, searchTerm]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      // Clear the products array first
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
      });
      setLoading(false);
      setProducts(data?.products);
      // Update categories with counts
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const filtercatcount = async () => {
    try {
      setLoading(true);  // Start the loading state
  
      // Fetch category counts from the API
      const { data } = await axios.post("/api/v1/product/category-count");
  
      if (data?.categoryCounts && Array.isArray(data.categoryCounts)) {
        setCategories(data.categoryCounts); // Update the categories with counts
      } else {
        console.error("Unexpected response structure:", data);
        toast.error("Failed to load category counts.");
      }
      
    } catch (error) {
      setLoading(false);
      console.error("Error fetching category counts:", error);
      toast.error("Error fetching category counts.");
    } finally {
      setLoading(false);  // End the loading state
    }
  };
  
  // Ensure this useEffect is only run once when the component mounts
  useEffect(() => {
    filtercatcount();
  }, [products]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Render category checkbox with count
  const renderCategoryCheckboxes = () => {
    return categories.map((category) => (
      <div key={category._id} className="custom-control custom-checkbox">
        <Checkbox
          onChange={(e) => handleFilter(e.target.checked, category._id)}
          checked={checked.includes(category._id)}
        >
          {category.name} <span3>{category.count || 0}</span3>
        </Checkbox>
      </div>
    ));
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <aside className="col-lg-3 col-md-4">
            <div className="card mb-4">
              <article className="filter-group">
                <header className="card-header">
                  <h6 className="title">Categories</h6>
                </header>
                <div className="filter-content">
                  <div className="card-body">
                    {renderCategoryCheckboxes()}
                  </div>
                </div>
              </article>
            </div>
          </aside>
          <main className="col-lg-9 col-md-8">
  <header className="border-bottom mb-4 pb-3">
    <div className="form-inline">
    <SearchForm />
    </div>
    <div className="product-count">
      Total Products: {total}
    </div>
  </header>

  <div className="product-container">
    {loading ? (
      <div className="text-center py-5">
        <Spin size="large" />
      </div>
    ) : (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(p => (
          <div className="col mb-4" key={p._id}>
            <Card
              hoverable
              cover={
                <div className="img-wrapper">
                  <img
                    alt={p.name}
                    src={p.photos && p.photos.length > 0 ? p.photos[0] : 'https://via.placeholder.com/300'}
                  />
                </div>
              }
              actions={[
                <NavLink to={`/product/${p.slug}`} key="view">View</NavLink>
              ]}
            >
              <Meta
                title={p.name.length > 20 ? `${p.name.substring(0, 20)}...` : p.name}
                description={
                  <>
                    <p>{p.description && p.description.length > 25
                      ? `${p.description.substring(0, 25)}...`
                      : p.description}</p>
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <StarFilled key={index} style={{ color: '#fadb14' }} />
                      ))}
                    </div>
                    <div className="mt-2">
                      <span className="text-muted mr-2 m-2"><del>${p.Orignalprice}</del></span>
                      <span className="font-weight-bold">${p.Discountedprice}</span>
                    </div>
                  </>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    )}
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
</main>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
