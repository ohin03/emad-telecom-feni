import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Search = () => {
  const [values] = useSearch()
  const [cart, setCart] = useCart()
  const navigate = useNavigate()

  return (
    <Layout title="Search Results">
      <div className="search-container">
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          <h6 className="search-subtitle">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product(s)`}
          </h6>
        </div>

        <div className="search-grid">
          {values?.results.map((product) => (
            <div key={product._id} className="search-card">
              <div className="search-card-img">
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
              </div>
              <div className="search-card-body">
                <h5 className="search-card-title">{product.name}</h5>
                <p className="search-card-desc">{product.description.substring(0, 50)}...</p>
                <p className="search-card-price">TK: {product.price}</p>
                <div className="search-card-buttons">
                  <button className="btn-details" onClick={() => navigate(`/product/${product.slug}`)}>More details</button>
                  <button className="btn-cart" onClick={() => {
                    const item = { ...product, quantity: 1 };
                    setCart([...cart, item]);
                    localStorage.setItem('cart', JSON.stringify([...cart, item]));
                    toast.success('Item Added to Cart');
                  }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
          {values?.results.length === 0 && (
            <h5 className="no-products">No products found</h5>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Search

