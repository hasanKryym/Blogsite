import React, { useEffect, useState } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
// import { managePostLikes } from '../../../../../../../data/dataPosting';
// import { getPostLikes } from '../../../../../../../data/dataFetching';

const Post = ({
  post_id,
  post_title,
  post_desc,
  post_image,
  post_date,
  post_views,
  deleteFromPosts,
}) => {
  const { getPostLikes } = require('../../../../../../../data/dataFetching');
  const { managePostLikes } = require('../../../../../../../data/dataPosting');

  const [isLoading, setIsLoading] = useState(true);

  const [postReactions, setPostReactions] = useState({
    isLiked: false,
    likes: 0,
    comments: 0,
  });

  useEffect(() => {
    const likes = getPostLikes(post_id);
    likes.then((res) => {
      setPostReactions({
        ...postReactions,
        isLiked: res.isLiked,
        likes: +res.postLikes,
      });
      setIsLoading(false);
    });
  }, []);

  const manageLikes = () => {
    setPostReactions({
      ...postReactions,
      isLiked: !postReactions.isLiked,
      likes: postReactions.isLiked
        ? postReactions.likes - 1
        : postReactions.likes + 1,
    });
    managePostLikes(post_id);
    // const response = managePostLikes(post_id);
    // response.then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <>
      <article className="profile_post">
        {post_image && (
          <div className="image_container">
            <Link to={`/posts/postDetails/${post_id}`}>
              <img src={post_image} alt="" />
            </Link>
          </div>
        )}

        <div className="profile_post-info">
          <h2 className="profile_post-title">{post_title}</h2>
          <p className="profile_post-details">{post_desc}</p>
        </div>
        <div className="btns_container">
          <div className="profile_functional-btns">
            <button onClick={() => deleteFromPosts(post_id)} className="button">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
          <div className="profile_post-reactions">
            <span>Views: {post_views}</span>
            <button onClick={() => manageLikes()}>
              {postReactions.isLiked ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i class="fa-regular fa-heart"></i>
              )}

              <span>{postReactions.likes}</span>
            </button>

            {/* <button>
              <i class="fa-regular fa-comment"></i>
              <span>{postReactions.comments}</span>
            </button> */}
          </div>
        </div>
      </article>
    </>
  );
};

export default Post;
