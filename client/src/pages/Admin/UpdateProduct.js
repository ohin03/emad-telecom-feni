import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import "./CreateProduct.css";

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

  // ================= GET SINGLE PRODUCT =================
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping ? "1" : "0");
      setCategory(data.product.category?._id || "");
    } catch (error) {
      console.log("GET SINGLE PRODUCT ERROR 👉", error);
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // ================= GET ALL CATEGORIES =================
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("GET CATEGORIES ERROR 👉", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // append category only when a valid id is selected
      if (category && category !== "undefined") {
        productData.append("category", category);
      }
      // shipping kept as string "0"/"1"; backend normalizes it
      if (shipping === "0" || shipping === "1") {
        productData.append("shipping", shipping);
      }
      if (photo) productData.append("photo", photo);

      // debug: list FormData entries
      try {
        // eslint-disable-next-line no-console
        console.log("Update Product FormData:", [...productData.entries()]);
      } catch (e) {}

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("UPDATE ERROR 👉", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      await axios.delete(`/api/v1/product/delete-product/${id}`);

      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log("DELETE ERROR 👉", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className="create-product-page container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3 admin-sidebar">
            <AdminMenu />
          </div>

          {/* Content */}
          <div className="col-12 col-md-9 d-flex justify-content-center">
            <div className="create-product-wrapper">
              <h1>Update Product</h1>

              <div className="create-product-glass">
                <div className="create-product-card-c">
                  {/* Category */}
                  <Select
                    size="large"
                    placeholder="Select category"
                    className="form-select mb-3"
                    onChange={(value) => setCategory(value)}
                    value={category || undefined}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>

                  {/* Upload */}
                  <label className="btn upload-btn mb-3">
                    {photo ? photo.name : "Upload Product Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>

                  {/* Preview */}
                  <div className="text-center mb-3">
                    <img
                      src={
                        photo
                          ? URL.createObjectURL(photo)
                          : `/api/v1/product/product-photo/${id}`
                      }
                      alt="preview"
                      className="img-preview"
                    />
                  </div>

                  {/* Product Inputs */}
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <textarea
                    className="form-control mb-3"
                    placeholder="Product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Price (TK)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <Select
                    size="large"
                    placeholder="Shipping available?"
                    className="form-select mb-4"
                    onChange={(value) => setShipping(value)}
                    value={shipping || undefined}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>

                  {/* Buttons */}
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={handleUpdate}
                  >
                    UPDATE PRODUCT
                  </button>

                  <button
                    className="btn btn-danger w-100"
                    onClick={handleDelete}
                  >
                    DELETE PRODUCT
                  </button>
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

