import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../../Context/cart';
import toast from 'react-hot-toast';
import './SingleProduct.css';
import Layout from '../../Layout/Layout';



const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useCart({}); // Assuming useCart is a custom hook managing cart state
  const [mainPhoto, setMainPhoto] = useState('');
  const [percentageOff, setPercentageOff] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const { slug } = useParams();
  const params = useParams();
  useEffect(() => {
    // Check if slug has changed and scroll to the top
    if (params) {

      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Function to fetch single product by slug
  const getSingleProduct = async (slug) => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      setProduct(data.product);
      if (data.product.photos.length > 0) {
        setMainPhoto(data.product.photos[0]);
      }

      // Calculate percentage off if Discountedprice and Orignalprice are valid fields
      const originalPrice = data.product.Orignalprice;
      const discountedPrice = data.product.Discountedprice;
      if (originalPrice && discountedPrice) {
        const percentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
        setPercentageOff(percentage.toFixed(2));
      }
      
      return data.product; // Return the fetched product
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  // Function to fetch related products based on categories
  const fetchRelatedProducts = async (product) => {
    if (!product || !product.category) return;
  
    try {
      const categoryIds = product.category.map(c => c._id);
      console.log(categoryIds)
      const { data } = await axios.post('/api/v1/product/get-product', { category: categoryIds });
        console.log(data)
        const allCategoryIds = data.product.map(p=>p.category)
        console.log(allCategoryIds)
        const relatedProducts = data.product.filter(p => {
          // Check if any of the product's categories match any of the current product's categories
          return p._id !== product._id && // Exclude the current product
                 p.category.some(cat => categoryIds.includes(cat._id || cat));
        });
      setFilteredProducts(relatedProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  // Effect to fetch data on component mount or when slug changes
  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const fetchedProduct = await getSingleProduct(slug);
        if (fetchedProduct) {
          await fetchRelatedProducts(fetchedProduct);
        }
      }
    };

    fetchData();
  }, [slug]); 
  const handleThumbnailClick = (photo) => {
    setMainPhoto(photo);
  };
  return (
    <Layout>
      {product ? (
        <div className="containers mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="image-container">
                {mainPhoto && (
                  <img src={mainPhoto} alt={product.name} className="img-fluid main-photo" />
                )}
              </div>
              <div className="thumbnail-row mt-2">
                {product.photos && product.photos.length > 0 ? (
                  product.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${product.name} ${index + 1}`}
                      className={`img-thumbnail ${mainPhoto === photo ? 'active-thumbnail' : ''}`}
                      onClick={() => handleThumbnailClick(photo)}
                    />
                  ))
                ) : (
                  <p>No photos available</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-details">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-description1">Exclusively Available On body Store</p>
                <div className='price d-flex'>
                  <h4 className="product-price1">${product.Orignalprice}</h4>
                  <h4 className="product-price">${product.Discountedprice} SAVE {percentageOff}% OFF</h4>
                </div>
                <div>
                  <h3 className='selectiontext'>Select Size:</h3>
                  <div className="size-selector">
                    {product.sizes.map((size, index) => (
                      <div
                        key={index}
                        className={`size-card ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className='selectiontext'>Select Color:</h3>
                  <div className="color-selector">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`color-card ${selectedColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
                <button
                  className="buttons"
                  onClick={() => {
                    if (!selectedSize || !selectedColor) {
                      toast.error('Please select size and color');
                      return;
                    }

                    const selectedProduct = {
                      ...product,
                      selectedSize,
                      selectedColor
                    };

                    setCart([...cart, selectedProduct]);
                    localStorage.setItem("cart", JSON.stringify([...cart, selectedProduct]));
                    toast.success("Item Added To Cart");
                  }}
                >
                  Add To Cart &#8594;
                </button>
                <p className="product-description">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-5">Loading...</p>
      )}

      {/* Render related products section */}
      {filteredProducts.length > 0 && (
  <div className="small-container">
    <section id="product-1" className="section-p1">
      <h2 className='titles'>Related Products</h2>
      <div className="pro-container">
            {filteredProducts.slice(0, 4).map(p => (
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
      )}</Layout>
  );
};

export default SingleProduct;
