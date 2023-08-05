import React from 'react';
import './HomeLink.css';
import { Link } from 'react-router-dom';

const HomeLink = () => {
  return (
    <>
      <Link className="home_link" to={'/'}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
    </>
  );
};

export default HomeLink;
