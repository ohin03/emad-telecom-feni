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
          <p className="search-subtitle">
            {values?.results.length < 1
              ? 'No Products Found'
              : `Found ${values?.results.length} product(s)`}
          </p>
        </div>

        <div className="search-grid">
          {values?.results.map((p) => (
            <div className="search-card" key={p._id}>
              <div className="search-card-img">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
              </div>

              <div className="search-card-body">
                <h5 className="search-card-title">{p.name}</h5>
                <p className="search-card-desc">
                  {p.description.substring(0, 50)}...
                </p>
                <p className="search-card-price">TK: {p.price}</p>

                <div className="search-card-buttons">
                  <button
                    className="btn-details"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>

                  <button
                    className="btn-cart"
                    onClick={() => {
                      const item = { ...p, quantity: 1 }
                      setCart([...cart, item])
                      localStorage.setItem(
                        'cart',
                        JSON.stringify([...cart, item])
                      )
                      toast.success('Added to cart')
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          {values?.results.length === 0 && (
            <h4 className="no-products">No products found</h4>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Search


