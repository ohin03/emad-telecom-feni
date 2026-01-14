import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const categories = useCategory();

  return (
  
    <Layout title="All Categories">
      <div className="categories-page-container">
        <div className="categories-page-row">
          {categories.map(c => (
            <div className="categories-page-col" key={c._id}>
              <Link to={`/category/${c.slug}`} className="category-btn">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  
  );
};

export default Categories;
