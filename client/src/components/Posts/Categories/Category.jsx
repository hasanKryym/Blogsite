import React from 'react';
import './Category.css';
import { Link } from 'react-router-dom';

const Category = ({ category_id, category_name, count }) => {
  return (
    <>
      <Link to={`/${category_id}`} className="post_categories-btn">
        <li id={category_id}>{category_name}</li>
        <span>({count ? count : 0})</span>
      </Link>
    </>
  );
};

export default Category;
