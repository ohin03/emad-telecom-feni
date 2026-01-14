import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
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

  // get categories
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

  // create product
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
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="create-product-page container-fluid">
        <div className="row">

          {/* Sidebar */}
          <div className="col-12 col-md-3 admin-sidebar">
            <AdminMenu />
          </div>

          {/* Content */}
          <div className="col-12 col-md-9 d-flex justify-content-center">
            <div className="create-product-wrapper">

              <h1>Create Product</h1>

              {/* GLASS FORM */}
              <div className="create-product-glass">
                <div className="create-product-card-c">

                  <Select
                    size="large"
                    placeholder="Select category"
                    className="form-select mb-3"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>

                  <label className="btn upload-btn mb-3">
                    {photo ? photo.name : "Upload Product Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>

                  {photo && (
                    <div className="text-center mb-3">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="preview"
                        className="img-preview"
                      />
                    </div>
                  )}

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
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>

                  <button className="btn btn-primary w-100" onClick={handleCreate}>
                    Create Product
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

export default CreateProduct;
