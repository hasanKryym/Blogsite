import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <>
      <div className="dot-spinner_container">
        <div class="dot-spinner">
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
