import React, { useContext, useEffect, useState } from 'react';
import Category from './Category';
import './Categories.css';
import { CategoriesContext } from '../../../context/posts/CategoriesContext';
import { Link } from 'react-router-dom';
import { countPostsByCategory } from '../../../data/dataFetching';
import Loading from '../../Loading/Loading';

const Categories = () => {
  const { categoriesData } = useContext(CategoriesContext);
  const [categories, setCategories] = categoriesData;
  const [showFullList, setShowFullList] = useState(false);

  const [sampleCategories, setSampleCategories] = useState([]);

  const [categoriesSum, setCategoriesSum] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoriesCount = countPostsByCategory();
    categoriesCount.then((res) => {
      let categories_sum = 0;
      res.map(({ category_id, count }) => {
        categories.map((category) => {
          if (category.category_id === category_id) {
            category.count = +count;
            categories_sum += +count;
          }
        });
      });
      setCategoriesSum(categories_sum);
      setSampleCategories(categories.slice(0, 4));
      setIsLoading(false);
    });
  }, [categories]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="post_categories-list">
          <Link to="/" className="post_categories-btn">
            <li>All</li>
            <span>({categoriesSum})</span>
          </Link>
          {showFullList
            ? categories.map((category) => {
                return <Category key={category.category_id} {...category} />;
              })
            : sampleCategories.map((category) => {
                return <Category key={category.category_id} {...category} />;
              })}
          <button
            onClick={() => setShowFullList(!showFullList)}
            className="show_all-categories_btn"
          >
            {showFullList ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </button>
        </ul>
      )}
    </>
  );
};

export default Categories;
