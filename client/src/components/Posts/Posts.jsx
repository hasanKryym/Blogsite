import React, { useEffect, useState } from 'react';
import './Posts.css';
import Post from './Post';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PostLoader from '../Loading/PostLoader/PostLoader';
import MobileFilter from '../Mobile/MobileFilter/MobileFilter';
// import { getPosts, getPostsByCategory } from '../../data/dataFetching';

const Posts = ({ category_id }) => {
  const { getPosts, getPostsByCategory } = require('../../data/dataFetching');

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const closeMobileFilter = () => {
    setShowMobileFilter(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setShowMobileFilter(false);
    if (category_id === 'all') {
      const response = getPosts();
      response.then((res) => {
        setPosts(res);
        setIsLoading(false);
      });
    } else {
      const filterdPosts = getPostsByCategory(category_id);

      filterdPosts
        .then((res) => {
          if (res.success) {
            setPosts(res.posts);
            setIsLoading(false);
          } else {
            toast.info(res.msg, {
              position: 'top-right',
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [category_id]);
  return (
    <>
      {isLoading ? (
        <>
          <section className="posts_container">
            <PostLoader />
            <PostLoader />
            <PostLoader />
          </section>
        </>
      ) : (
        !showMobileFilter && (
          <section className="posts_container">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="mobile_filter-btn"
            >
              <i className="fa-solid fa-filter"></i>
            </button>
            {posts.map((post) => {
              return <Post key={post.post_id} {...post} />;
            })}
          </section>
        )
      )}

      {showMobileFilter && (
        <MobileFilter closeMobileFilter={closeMobileFilter} />
      )}

      <ToastContainer />
    </>
  );
};

export default Posts;
