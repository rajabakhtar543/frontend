import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Button, Form, Input, Checkbox, Select } from 'antd';

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Orignalprice, setOrignalPrice] = useState("");
  const [Discountedprice, setDiscountedPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [id, setId] = useState("");
  const [form] = Form.useForm();

  // Fetch single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
   
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setOrignalPrice(data.product.Orignalprice);
      setDiscountedPrice(data.product.Discountedprice);
      setSizes(data.product.sizes);
      setColors(data.product.colors);

      setStock(data.product.stock.toString()); // Assuming stock is returned as a string
      setSelectedCategories(data.product.category.map(cat => cat._id)); // Assuming category is an array of objects with _id
      setPhotos(data.product.photos);
      // Assuming photos is an array of objects with url
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  // Handle file change for photo upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(prevPhotos => [...prevPhotos, ...files]);
  };

  // Handle category change
  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };

  // Handle remove photo
  const handleRemovePhoto = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  // Convert URL to File object
  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  };

  // Handle update product
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      // Convert existing photo URLs to File objects and append them
      const existingPhotos = await Promise.all(
        photos.map(async (photo, index) => {
          if (typeof photo === 'string') {
            const fileExtension = photo.split('.').pop();
            const mimeType = `image/${fileExtension}`;
            return await urlToFile(photo, `existing_photo_${index}.${fileExtension}`, mimeType);
          }
          return photo;
        })
      );

      existingPhotos.forEach(photo => formData.append('photos', photo));

      const uploadResponse = await axios.post('/api/v1/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const imagePaths = uploadResponse.data.files;

      const productData = {
        name,
        description,
        Orignalprice,
        Discountedprice,
        sizes,
        colors,
        category: selectedCategories,
        stock,
        photos: imagePaths // Save the paths of uploaded images
      };

      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle delete product
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
        const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
        if (data.success) {
          toast.success("Product deleted successfully");
          navigate("/dashboard/admin/products");
        } else {
          toast.error("Failed to delete product");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    
    <div className="home-container">
    <Sidebar />
    <div className="main-content">
      <Navbar />
          <div><h3>Update Product</h3></div>
          <div className="m-1 w-75">
            <Form form={form} layout="vertical">
              <Form.Item label="Category">
                <Checkbox.Group
                  options={categories.map(cat => ({ label: cat.name, value: cat._id }))}
                  onChange={handleCategoryChange}
                  value={selectedCategories}
                />
              </Form.Item>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 w-20">
                  <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
              <div className="mb-3">
                {photos.length > 0 && (
                  <div className="text-center">
                    {photos.map((photo, index) => (
                      <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                        <img
                          src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)}
                          alt={`product_photo_${index}`}
                          className="img img-responsive"
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            background: 'red',
                            color: 'white',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            padding: '2px 5px'
                          }}
                          onClick={() => handleRemovePhoto(index)}
                        >
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <Input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input.TextArea
                  value={description}
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="number"
                  value={Orignalprice}
                  placeholder="Orignal Price"
                  onChange={(e) => setOrignalPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="number"
                  value={Discountedprice}
                  placeholder="Discounted Price"
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                />
              </div>
              <Form.Item label="Sizes">
                <Checkbox.Group
                  options={["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => ({
                    label: size,
                    value: size,
                  }))}
                  onChange={(checkedValues) => setSizes(checkedValues)}
                  value={sizes}
                />
              </Form.Item>
              <Form.Item label="Colors">
                <Select
                  mode="tags"
                  placeholder="Select or input colors"
                  onChange={(selectedColors) => setColors(selectedColors)}
                  style={{ width: "100%" }}
                  tokenSeparators={[","]}
                  value={colors}
                />
              </Form.Item>
              <div className="mb-3">
                <Select
                  placeholder="Select Stock"
                  value={stock}
                  onChange={(value) => setStock(value)}
                >
                  <Option value="1">In Stock</Option>
                  <Option value="0">Out Of Stock</Option>
                </Select>
              </div>
              <div className="mb-3">
                <Button type="primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </Button>
              </div>
              <div className="mb-3">
                <Button type="danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

  );
};

export default UpdateProduct;
