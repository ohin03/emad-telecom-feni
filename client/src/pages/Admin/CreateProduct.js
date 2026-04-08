import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaCube, FaPlusSquare, FaTrash } from "react-icons/fa";
import "./CreateProduct.css";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("category", category);
    productData.append("photo", photo);
    productData.append("shipping", shipping);

    try {
      const { data } = await axios.post("/api/v1/product/create-product", productData);
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Inventory - Create Product">
      <div className="admin-pro-container">
        <div className="container-fluid py-4">
          <div className="row g-4">
            
            {/* Sidebar Section */}
            <div className="col-lg-3 col-md-4">
              <div className="sidebar-sticky-pro">
                <AdminMenu />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9 col-md-8">
              <div className="product-form-card shadow-lg">
                <div className="form-header-pro mb-4">
                  <div className="header-icon-pro">
                    <FaPlusSquare />
                  </div>
                  <div className="header-text">
                    <h2>Add New Product</h2>
                    <p>Enter details to update Emad Telecom inventory</p>
                  </div>
                </div>

                <div className="row">
                  {/* Left Column: Media Upload */}
                  <div className="col-lg-5 mb-4">
                    <div className="upload-zone-pro">
                      <label className="upload-label">
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {photo ? (
                          <div className="preview-container">
                            <img src={URL.createObjectURL(photo)} alt="product" className="img-fluid rounded" />
                            <div className="change-overlay"><FaCloudUploadAlt /> Change Photo</div>
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <FaCloudUploadAlt className="up-icon" />
                            <h6>Upload Product Image</h6>
                            <p>PNG, JPG up to 5MB</p>
                          </div>
                        )}
                      </label>
                      {photo && (
                         <button className="btn-remove-photo" onClick={() => setPhoto("")}>
                           <FaTrash /> Remove
                         </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="col-lg-7">
                    <div className="form-grid-pro">
                      <div className="row g-3">
                        <div className="col-12">
                          <Select
                            placeholder="Search Category"
                            size="large"
                            showSearch
                            className="pro-antd-select w-100"
                            onChange={(v) => setCategory(v)}
                          >
                            {categories?.map((c) => (
                              <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}
                          </Select>
                        </div>

                        <div className="col-12">
                          <input
                            type="text"
                            className="pro-input"
                            placeholder="Product Title (e.g. iPhone 15 Pro Max)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="col-12">
                          <textarea
                            className="pro-input"
                            rows="4"
                            placeholder="Write a detailed description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="input-group-pro">
                            <span className="unit">৳</span>
                            <input
                              type="number"
                              className="pro-input ps-5"
                              placeholder="Price"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <input
                            type="number"
                            className="pro-input"
                            placeholder="Stock Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>

                        <div className="col-12">
                          <Select
                            placeholder="Shipping Status"
                            size="large"
                            className="pro-antd-select w-100"
                            onChange={(v) => setShipping(v)}
                          >
                            <Option value="0">No Shipping</Option>
                            <Option value="1">Shipping Available</Option>
                          </Select>
                        </div>

                        <div className="col-12 mt-4">
                          <button className="pro-submit-btn" onClick={handleCreate}>
                            <FaCube className="me-2" /> Launch Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;