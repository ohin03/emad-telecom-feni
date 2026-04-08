import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaCamera, FaStore, FaSave, FaArrowLeft } from "react-icons/fa";
import "./UpdateProduct.css";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping ? "1" : "0");
      setCategory(data.product.category?._id || "");
    } catch (error) {
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (category) productData.append("category", category);
      if (shipping) productData.append("shipping", shipping);
      if (photo) productData.append("photo", photo);

      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Do you really want to delete this asset?");
      if (!answer) return;
      await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success("Product Purged Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="System - Update Product">
      <div className="update-pro-page">
        <div className="container-fluid py-4">
          <div className="row g-4 justify-content-center">
            
            {/* Sidebar for Desktop */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="sticky-pro-menu">
                <AdminMenu />
              </div>
            </div>

            {/* Main Form Section */}
            <div className="col-lg-8 col-12">
              <div className="glass-card-pro shadow-lg">
                
                {/* Mobile Back Button & Header */}
                <div className="form-head-pro d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="back-circle d-lg-none" onClick={() => navigate(-1)}>
                       <FaArrowLeft />
                    </div>
                    <div className="icon-box-pro">
                      <FaEdit />
                    </div>
                    <div>
                      <h4 className="m-0 fw-bold">Update Asset</h4>
                      <p className="text-muted small m-0">Editing: {name || "Loading..."}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Photo Section */}
                  <div className="col-md-5 mb-4">
                    <div className="pro-photo-area">
                      <label className="pro-upload-box">
                        <input 
                          type="file" 
                          accept="image/*" 
                          hidden 
                          onChange={(e) => setPhoto(e.target.files[0])} 
                        />
                        <div className="image-preview-wrapper">
                          <img
                            src={photo ? URL.createObjectURL(photo) : `/api/v1/product/product-photo/${id}`}
                            alt="product"
                            className="main-img-pro"
                          />
                          <div className="upload-overlay-pro">
                            <FaCamera className="cam-icon" />
                            <span>Replace Media</span>
                          </div>
                        </div>
                      </label>
                      <p className="text-center mt-2 small text-muted">Click image to change</p>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="col-md-7">
                    <div className="pro-input-stack">
                      
                      <div className="field-block mb-3">
                        <label className="pro-label">Catalog Category</label>
                        <Select
                          showSearch
                          size="large"
                          placeholder="Select a category"
                          className="pro-select w-100"
                          onChange={(v) => setCategory(v)}
                          value={category}
                        >
                          {categories?.map((c) => (
                            <Option key={c._id} value={c._id}>{c.name}</Option>
                          ))}
                        </Select>
                      </div>

                      <div className="field-block mb-3">
                        <label className="pro-label">Display Title</label>
                        <input
                          type="text"
                          className="pro-field-input"
                          value={name}
                          placeholder="Enter product name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="field-block mb-3">
                        <label className="pro-label">Description</label>
                        <textarea
                          rows="4"
                          className="pro-field-input"
                          value={description}
                          placeholder="Technical specifications..."
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="row g-3">
                        <div className="col-6">
                          <label className="pro-label">Unit Price (TK)</label>
                          <input
                            type="number"
                            className="pro-field-input"
                            value={price}
                            placeholder="0.00"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <div className="col-6">
                          <label className="pro-label">Inventory Qty</label>
                          <input
                            type="number"
                            className="pro-field-input"
                            value={quantity}
                            placeholder="Stock"
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="field-block mt-3 mb-4">
                        <label className="pro-label">Logistics Option</label>
                        <Select
                          size="large"
                          className="pro-select w-100"
                          onChange={(v) => setShipping(v)}
                          value={shipping}
                        >
                          <Option value="0">Local Pickup Only</Option>
                          <Option value="1">Express Shipping</Option>
                        </Select>
                      </div>

                      {/* Action Buttons */}
                      <div className="action-grid-pro mt-4">
                        <button className="save-btn-pro" onClick={handleUpdate}>
                          <FaSave className="me-2" /> Save Changes
                        </button>
                        <button className="delete-btn-pro" onClick={handleDelete}>
                          <FaTrashAlt className="me-2" /> Delete Asset
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
    </Layout>
  );
};

export default UpdateProduct;
