import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <Layout title={"Go back -> 404"} description="Oops! The page you are looking for doesn't exist. Visit Emad Telecom for mobile phones, accessories, repair services, and second-hand devices."
     keywords="Mobile, Accessories, Repair, Second Hand Phones, 404, Not Found, Feni" >

      
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='png-heading'>Oops ! page not found</h2> <br />
        <Link to='/' className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound