import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';

const Post = ({
  post_id,
  post_title,
  post_desc,
  post_image,
  post_date,
  post_views,
  user_id,
  user_name,
  category_id,
  category_name,
}) => {
  return (
    <>
      <article className="post">
        {post_image && (
          <div className="post_image-container">
            <div className="category_type">{category_name}</div>
            <img src={post_image} alt="" />
          </div>
        )}

        <div className="post_content">
          <h3 className="post_title">{post_title}</h3>

          <div className="post_info">
            <span className="writer_name">By: {user_name}</span>
            <span className="post_date">{post_date}</span>
            <span className="post_views">
              <span>{post_views}</span>
              <span>views</span>
            </span>
          </div>
          <div className="post_description-container">
            <p className="post_description">{post_desc}</p>
          </div>
          <Link to={`/posts/postDetails/${post_id}`}>
            <button className="showDetails_btn button">Read More</button>
          </Link>
        </div>
      </article>
    </>
  );
};

export default Post;
