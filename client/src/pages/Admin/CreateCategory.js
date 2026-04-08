import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import CategoryForm from "./../../components/Form/CategoryForm";
import { Modal } from "antd";
import "./CreateCategory.css";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus, FaLayerGroup } from "react-icons/fa";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data?.category);
    } catch {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      }
    } catch {
      toast.error("Input already exists or error occurred");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName });
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`);
      if (data?.success) {
        toast.success(`Category deleted`);
        getAllCategory();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Dashboard - Create Category">
      <div className="category-pro-page">
        <div className="container-fluid py-4 px-lg-5">
          <div className="row g-4">
            
            {/* Sidebar Section */}
            <div className="col-lg-3 col-md-4">
              <div className="sticky-nav">
                <AdminMenu />
              </div>
            </div>

            {/* Main Section */}
            <div className="col-lg-9 col-md-8">
              <div className="category-card-pro">
                
                {/* Header Area */}
                <div className="pro-card-header mb-4">
                  <div className="header-icon-box">
                    <FaLayerGroup />
                  </div>
                  <div>
                    <h2>Category Management</h2>
                    <p>Organize and structure your product collections</p>
                  </div>
                </div>

                {/* Create Form Section */}
                <div className="form-container-pro shadow-sm mb-5">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <FaPlus className="text-teal" />
                    <h5 className="m-0 fw-bold">Add New Category</h5>
                  </div>
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                </div>

                {/* Table Section */}
                <div className="table-responsive-pro">
                  <table className="table custom-pro-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th className="text-end">Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c, index) => (
                        <tr key={c._id} className="pro-table-row">
                          <td className="row-index ">{index + 1}</td>
                          <td className="row-name text-warning">{c.name}</td>
                          <td className="text-end">
                            <div className="action-btns">
                              <button 
                                className="btn-edit-pro" 
                                onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c); }}
                              >
                                <FaEdit />
                              </button>
                              <button className="btn-delete-pro" onClick={() => handleDelete(c._id)}>
                                <FaTrashAlt />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Edit Modal */}
                <Modal 
                  onCancel={() => setVisible(false)} 
                  footer={null} 
                  open={visible}
                  className="pro-antd-modal"
                >
                  <div className="modal-inner">
                    <h4 className="mb-4 fw-bold">Update Category Name</h4>
                    <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                  </div>
                </Modal>

              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;