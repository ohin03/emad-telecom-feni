import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaBoxes, FaSearch, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './Product.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page to 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <Layout title="Inventory Management - Emad Telecom">
      <div className="admin-inventory-page">
        <div className="container-fluid py-4 px-lg-5">
          <div className="row g-4">
            
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="sticky-top" style={{ top: '100px', zIndex: '10' }}>
                <AdminMenu />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="inventory-header mb-4">
                <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
                  <div className="header-icon">
                    <FaBoxes />
                  </div>
                  <div>
                    <h2 className="m-0 fw-bold">Product Inventory</h2>
                    <p className="text-muted m-0">Manage and track all {products.length} products</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="search-box-pro">
                  <FaSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Product Grid */}
              <div className="admin-product-grid">
                {currentProducts?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="inventory-card-link"
                  >
                    <div className="inventory-card shadow-sm">
                      <div className="img-container">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          onError={(e) => { e.target.src = "/images/placeholder.png"; }}
                        />
                        <div className="card-overlay">
                          <span className="edit-btn-pro"><FaEdit /> Manage</span>
                        </div>
                        {p.quantity < 1 && <span className="stock-badge out">Out of Stock</span>}
                        {p.quantity > 0 && p.quantity < 5 && <span className="stock-badge low">Low Stock</span>}
                      </div>

                      <div className="card-info">
                        <h6 className="product-title">{p.name}</h6>
                        <p className="product-desc">{p.description.substring(0, 40)}...</p>
                        <div className="price-row">
                          <span className="price-tag">৳ {p.price}</span>
                          <span className="stock-count">Stock: {p.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination UI */}
              {filteredProducts.length > productsPerPage && (
                <div className="pro-pagination-container">
                  <button 
                    className="pro-page-btn"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft /> Prev
                  </button>
                  
                  <div className="page-info">
                    Page <strong>{currentPage}</strong> of {totalPages}
                  </div>

                  <button 
                    className="pro-page-btn"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next <FaChevronRight />
                  </button>
                </div>
              )}

              {/* No Data View */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-5 no-data">
                  <img src="/images/no-product.svg" alt="no products" className="mb-3" style={{ width: '150px' }} />
                  <h4>No products found!</h4>
                  <p>Try searching for something else or add new products.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;