import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "./CategoryProduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);



  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      // Make sure data.products is an array
      setProducts(Array.isArray(data?.products) ? data.products : []);
      setCategory(data?.category || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-page-body">
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center mb-4">{products?.length} result found</h6>

        <div className="row">
          {products?.map((p) => (
            <div className="col-md-3 col-sm-6 mb-4" key={p._id}>
              <div className="card h-100">

                {/* Product Image */}
                <img
                  src={
                    p?.photo
                      ? `/api/v1/product/product-photo/${p._id}?${new Date().getTime()}`
                      : "/images/placeholder.png"
                  }
                  alt={p.name || "Product"}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    // fallback if image fails to load
                    e.target.src = "/images/placeholder.png";
                  }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description?.substring(0, 50)}...
                  </p>
                  <p className="card-text">
                    <strong>TK:</strong> {p.price}
                  </p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>

                    <button className="btn btn-secondary btn-sm" onClick={() => {
                      const item = { ...p, quantity: 1 };
                      setCart([...cart, item]);
                      localStorage.setItem('cart', JSON.stringify([...cart, item]));
                      toast.success('Item Added to Cart');
                    }}>
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-12 text-center mt-5">
              <h5>No products found in this category</h5>
            </div>
          )}
        </div>
      </div>
    </Layout>
    </div>
  );
};

export default CategoryProduct;
