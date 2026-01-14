import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || 'Emad Telecom'}</title>
        <meta
          name="description"
          content={
            description ||
            'Emad Telecom - Trusted Mobile Shop in Feni. Mobile phones, accessories, repair services & second-hand devices.'
          }
        />
        <meta
          name="keywords"
          content={
            keywords ||
            'Mobile, Accessories, Repair, Second Hand Phones, Smartphones, Feni'
          }
        />
        <meta name="author" content={author || 'Emad Telecom'} />
      </Helmet>

      <Header />
      <main style={{ minHeight: '73vh' }}>
         <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
