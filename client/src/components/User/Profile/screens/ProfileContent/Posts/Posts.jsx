import React, { useEffect, useState } from 'react';
import './Posts.css';
import Post from './Post/Post';
import { getUserPosts } from '../../../../../../data/dataFetching';
import PostLoader from '../../../../../Loading/PostLoader/PostLoader';
import { deletePost } from '../../../../../../data/dataDeleting';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const response = getUserPosts();
    response.then((res) => {
      setPosts(res);
      setIsLoading(false);
    });
  }, []);

  const deleteFromPosts = (post_id) => {
    setIsLoading(true);
    const filteredPosts = posts.filter((post) => {
      return post.post_id !== post_id;
    });
    setPosts(filteredPosts);
    setIsLoading(false);
    deletePost(post_id);
  };
  return (
    <>
      {isLoading ? (
        <>
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </>
      ) : (
        <section className="profile_post-section">
          {posts.map((post) => {
            return (
              <Post
                key={post.post_id}
                deleteFromPosts={deleteFromPosts}
                {...post}
              />
            );
          })}
        </section>
      )}
    </>
  );
};

export default Posts;
