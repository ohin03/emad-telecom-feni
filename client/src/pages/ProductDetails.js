import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const [cart, setCart] = useCart(); // Add cart hook

  // Fetch single product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      if (data?.success) {
        setProduct(data.product);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch related products
  const getRelatedProducts = async () => {
    try {
      setRelatedLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/related-product/${product._id}/${product.category._id}`
      );
      if (data?.success) {
        setRelatedProducts(data.products);
      }
      setRelatedLoading(false);
    } catch (error) {
      console.log(error);
      setRelatedLoading(false);
    }
  };

  // Fetch product on slug change
  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  // Fetch related products after product load
  useEffect(() => {
    if (product?._id && product?.category?._id) {
      getRelatedProducts();
    }
  }, [product]);

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="text-center mt-5">Loading product...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Product not found">
        <div className="text-center mt-5">Product not found</div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <div className="container mt-4">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6 product-details-col">
            <h2 className="mb-3">{product.name}</h2>
            <p>{product.description}</p>
            <h4 className="mt-3">Price: ৳ {product.price}</h4>
            <p>
              <strong>Category:</strong> {product.category?.name}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>

            {/* Add to Cart */}
            <button
              className="btn btn-primary mt-3 me-2"
              onClick={() => {
                const item = { ...product, quantity: 1 };
                setCart([...cart, item]);
                localStorage.setItem("cart", JSON.stringify([...cart, item]));
                toast.success("Item Added to Cart");
              }}
            >
              Add to Cart
            </button>

            <button className="btn btn-outline-secondary mt-3">Buy Now</button>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products-section mt-5">
          <h3 className="text-center">Similar Products</h3>
          {relatedLoading ? (
            <p>Loading related products...</p>
          ) : relatedProducts.length === 0 ? (
            <p>No related products found.</p>
          ) : (
            <div className="related-products-container d-flex flex-wrap">
              {relatedProducts.map((p) => (
                <div key={p._id} className="product-details-card m-2" style={{ width: "18rem" }}>
                  <div className="product-img-wrapper">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 50)}...</p>
                    <p className="card-text">TK: {p.price}</p>
                    <div className="btn-wrapper d-flex justify-content-between">
                      <button
                        className="btn btn-primary p-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More details
                      </button>
                      <button
                        className="btn btn-secondary p-1"
                        onClick={() => {
                          const item = { ...p, quantity: 1 };
                          setCart([...cart, item]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, item])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
