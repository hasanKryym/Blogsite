import { useState } from 'react';
import Categories from '../../Posts/Categories/Categories';
import './MobileFilter.css';

const MobileFilter = ({ closeMobileFilter }) => {
  return (
    <>
      <div className={`mobile_filter-container slide-in-top`}>
        <button onClick={() => closeMobileFilter()}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <Categories />
      </div>
    </>
  );
};

export default MobileFilter;
