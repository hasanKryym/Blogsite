import React, { useState, createContext, useEffect } from 'react';
import { getPostsCategories } from '../../data/dataFetching';

export const CategoriesContext = createContext();

export const CategoriesStatus = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = getPostsCategories();
    fetchCategories.then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categoriesData: [categories, setCategories],
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};
