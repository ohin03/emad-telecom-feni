import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Search = () => {
  const [values, setValues] = useSearch()
  const [cart, setCart] = useCart()
  const navigate = useNavigate()

  return (
    <Layout title={'Search results'}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>

            <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
                key={p._id}
                className="create-product-card m-2"
                style={{ width: "18rem" }}
              >
                <div className="product-img-wrapper">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img-preview"
                    alt={p.name}
                  />
                </div>

                <div className="card-body">
  <h5 className="card-title">{p.name}</h5>
  <p className="card-text">{p.description.substring(0, 50)}...</p>
  <p className="card-text">TK: {p.price}</p>

  <div className="btn-wrapper">
    <button className="btn btn-primary p-1" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
    <button className="btn btn-secondary p-1" onClick={() => {
      const item = { ...p, quantity: 1 };
      setCart([...cart, item]);
      localStorage.setItem('cart', JSON.stringify([...cart, item]));
      toast.success('Item Added to Cart');
    }}>ADD TO CART</button>
  </div>
</div>

              </div>
            ))}
            {values?.results.length === 0 && (
              <h5 className="text-center mt-3">No products found</h5>
            )}
          </div>



        </div>
      </div>
    </Layout>
  )
}

export default Search

