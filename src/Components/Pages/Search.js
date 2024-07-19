import React from 'react';

import { useSearch } from '../../Context/search';
import"./Search.css"
import Layout from '../Layout/Layout';
import { useCart } from '../../Context/cart';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Search = () => {
  const[cart,setCart]  = useCart();
  const [value, setValue] = useSearch();

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {value?.result.length < 1
              ? 'No Products Found'
              : `Found ${value.result.length} Products`}
          </h6>
          <div className="d-flex flex-wrap justify-content center mt-4" id='product-1'>
          {value?.result.map(p => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
