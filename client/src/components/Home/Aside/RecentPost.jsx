import React, { useEffect, useState } from 'react';
import './Aside.css';
import { Link } from 'react-router-dom';

const RecentPost = ({
  post_id,
  post_title,
  post_desc,
  post_image,
  post_date,
  post_views,
  user_id,
  user_name,
}) => {
  return (
    <>
      <Link className="recent_posts-link" to={`/posts/postDetails/${post_id}`}>
        <div className="recent_post">
          <img className="recent_post-image" src={post_image} alt="" />
          <div className="recent_post-content">
            <p className="recent_post-title">{post_title}</p>
            <span className="recent_post-date">{post_date}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecentPost;
