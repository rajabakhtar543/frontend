import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Form, Input, Checkbox, Select } from "antd";
const { Option } = Select;
const Createproduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Orignalprice, setOrignalPrice] = useState("");
  const [Discountedprice, setDiscountedPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");

  const [photos, setPhotos] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/all-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong In getting Category");
      }
    };

    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !Orignalprice ||
      !Discountedprice ||
      selectedCategories.length === 0 ||
      !stock ||
      photos.length === 0
    ) {
      toast.error("Please fill all the fields and upload at least one photo");
      return;
    }

    try {
      const formData = new FormData();
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      const uploadResponse = await axios.post(
        "/api/v1/product/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imagePaths = uploadResponse.data.files;

      const productData = {
        name,
        description,
        Orignalprice,
        Discountedprice,
        category: selectedCategories,
        stock,
        colors,
        sizes,
        photos: imagePaths, // Save the paths of uploaded images
      };

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + photos.length <= 5) {
      setPhotos([...photos, ...selectedFiles]);
      setImageURLs([
        ...imageURLs,
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ]);
    } else {
      alert("You can only upload up to 5 images.");
    }
  };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };

  return (
   
    <div className="home-container">
    <Sidebar />
    <div className="main-content">
      <Navbar />
          <div>
            <h1>Create Product</h1>
          </div>
          <div className="m-1 w-75">
            <Form form={form} layout="vertical">
              <Form.Item label="Category">
                <Checkbox.Group
                  options={categories.map((cat) => ({
                    label: cat.name,
                    value: cat._id,
                  }))}
                  onChange={handleCategoryChange}
                  value={selectedCategories}
                />
              </Form.Item>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 w-20">
                  {/* {photos.length > 0 ? `${photos.length} files selected` : 'Upload Photos'} */}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="mb-3">
                {imageURLs.length > 0 && (
                  <div className="text-center">
                    {imageURLs.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`product_photo_${index}`}
                        height="200px"
                        className="img img-responsive"
                        style={{ margin: "10px" }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <Input
                  type="text"
                  value={name}
                  placeholder="Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input.TextArea
                  type="text"
                  value={description}
                  placeholder="Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="number"
                  value={Orignalprice}
                  placeholder=" Orignal Price"
                  className="form-control"
                  onChange={(e) => setOrignalPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="number"
                  value={Discountedprice}
                  placeholder=" Discounted Price"
                  className="form-control"
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
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setStock(value)}
                >
                  <Option value="1">In Stock</Option>
                  <Option value="0">Out Of Stock</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
   
  );
};

export { Createproduct };
