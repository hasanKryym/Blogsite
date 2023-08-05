import React, { useEffect, useState } from 'react';
import './Posts.css';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import { getPosts, getPostsByCategory } from '../../data/dataFetching';
import { ToastContainer, toast } from 'react-toastify';
import PostLoader from '../Loading/PostLoader/PostLoader';

const Posts = ({ category_id }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        <section className="posts_container">
          {posts.map((post) => {
            return <Post key={post.post_id} {...post} />;
          })}
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Posts;
