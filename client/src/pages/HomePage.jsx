import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import "./HomePage.css";
import SearchInput from "../components/Form/SearchInput";
import { useCart } from "../context/cart";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();




  //load more 
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [total, setTotal] = useState(0);
const getTotal = async () => {
  try {
    const { data } = await axios.get("/api/v1/product/product-count");
    setTotal(data.total);
  } catch (error) {
    console.log(error);
  }
};
const loadProducts = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `/api/v1/product/product-list/${page}`
    );
    // initial load should set products
    setProducts(data.products || []);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};
const loadMore = async () => {
  try {
    if (loading) return;
    const nextPage = page + 1;
    setLoading(true);
    const { data } = await axios.get(
      `/api/v1/product/product-list/${nextPage}`
    );
    const more = data.products || [];
    setProducts((prev) => [...prev, ...more]);
    setPage(nextPage);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};
useEffect(() => {
  loadProducts();
  getTotal();
  // reset to page 1 on mount
  setPage(1);
}, []);







  
  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log("Failed to load categories", error);
    }
  };

  // Fetch all products (used when no filters applied)
  const getAllProducts = async () => {
    try {
      // align with pagination list to avoid overwriting load-more list
      const { data } = await axios.get(`/api/v1/product/product-list/1`);
      if (data?.success) setProducts(data.products || []);
      setPage(1);
    } catch (error) {
      console.log("Failed to load products", error);
    }
  };

  // Initial load
  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);

  // Handle category checkbox
  const handleFilter = (checkedValue, id) => {
    let all = [...checked];
    if (checkedValue) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      if (data?.success) setProducts(data.products);
    } catch (error) {
      console.log("Error filtering products", error);
    }
  };

  // Trigger filter whenever category or price changes
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts(); // if no filters, show all
    }
  }, [checked, radio]);

  return (
    <div className="HomePage">
    <Layout
      title={"All products -> Emad Telecom"}
      description="Shop the latest mobile phones, accessories, repair services, and second-hand devices at Emad Telecom. Best offers on smartphones in Feni."
      keywords="Mobile, Accessories, Repair, Second Hand Phones, Smartphones, Best Offers, Feni, Mobile Shop"
    >




<section className="contact-hero">
  <div className="single-hero-banner">
    <img
      src="/images/contact-banner2.png"
      className="d-block w-100 hero-img"
      alt="Contact Banner"
     
    />
  </div>
</section>

      <div className="row mt-4">
        {/* Filter Sidebar */}
        <div className="col-md-2">
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              className="text-black">
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}  className="text-black" >{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-md-10">
          <h1 className="text-center mb-4 text-black" >All Products</h1>
          <div className="d-flex justify-content-center align-items-center p-5">
               <SearchInput />
           </div>

          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                key={p._id}
                className="create-product-card m-2"
                style={{ width: "18rem" }}
              >
                <div className="product-img-wrapper">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img-preview "
                    alt={p.name}
                  />
                </div>

                <div className="card-body">
  <h5 className="card-title text-danger">{p.name}</h5>
  <p className="card-text">{p.description.substring(0, 50)}...</p>
  <p className="card-text">TK: {p.price}</p>

  <div className="btn-wrapper">
    <button
  className="btn btn-primary p-1"
  onClick={() => navigate(`/product/${p.slug}`)}
>
  More Details
</button>

       
              <button className="btn btn-secondary p-1" onClick={() => {
                const item = { ...p, quantity: 1 };
                setCart([...cart, item]);
                localStorage.setItem('cart', JSON.stringify([...cart, item]))
                toast.success('Item Added to Cart');
              }}   >ADD TO CART</button>
        


  
  </div>
</div>

              </div>
            ))}
            {products?.length === 0 && (
              <h5 className="text-center mt-3">No products found</h5>
            )}
          </div>
        </div>
      </div>

     


<div className="text-center mt-3">
  {products.length < total && (
    <button
      className="btn btn-dark"
      onClick={loadMore}
      disabled={loading}
    >
      {loading ? "Loading..." : "LOAD MORE"}
    </button>
  )}
</div>




    </Layout></div>
  );
}

export default HomePage;
