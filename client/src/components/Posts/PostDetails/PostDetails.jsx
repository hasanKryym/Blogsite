import React, { useEffect, useState } from 'react';
import './PostDetails.css';
import { useParams } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import MobileNav from '../../Mobile/MobileNav/MobileNav';
import SideBar from '../../SideBar/SideBar';
// import {
//   countPostComments,
//   getPostById,
//   getPostLikes,
// } from '../../../data/dataFetching';

// import { managePostLikes, managePostViews } from '../../../data/dataPosting';
import PostComments from '../PostComments/PostComments';

const PostDetails = () => {
  const {
    countPostComments,
    getPostById,
    getPostLikes,
  } = require('../../../data/dataFetching');

  const {
    managePostLikes,
    managePostViews,
  } = require('../../../data/dataPosting');

  const params = useParams();
  const { id: post_id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [postDetails, setPostDetails] = useState({
    post_title: '',
    post_date: '',
    post_desc: '',
    post_image: '',
    post_views: '',
    user_id: '',
    category_id: '',
    user_name: '',
  });

  const [postReactions, setPostReactions] = useState({
    isLiked: false,
    likes: 0,
    comments: 0,
  });

  const addComment = () => {
    setPostReactions({
      ...postReactions,
      comments: +postReactions.comments + 1,
    });
  };

  const decreaseCommentCounter = () => {
    setPostReactions({
      ...postReactions,
      comments: +postReactions.comments - 1,
    });
  };

  const [showCommentsSection, setShowCommentSection] = useState(false);

  const closeComments = () => {
    setShowCommentSection(false);
  };

  const manageLikes = () => {
    setPostReactions({
      ...postReactions,
      isLiked: !postReactions.isLiked,
      likes: postReactions.isLiked
        ? postReactions.likes - 1
        : postReactions.likes + 1,
    });
    managePostLikes(post_id);
  };

  useEffect(() => {
    const details = getPostById(post_id);
    details.then((res) => {
      if (res) {
        setPostDetails(res);
        const likes = getPostLikes(post_id);
        likes.then((res) => {
          const comments = countPostComments(post_id);
          comments.then((comments_count) => {
            setPostReactions({
              ...postReactions,
              isLiked: res.isLiked,
              likes: +res.postLikes,
              comments: comments_count,
            });

            setIsLoading(false);
            managePostViews(post_id);
          });
        });
      }
    });
  }, []);
  return (
    <>
      <div className="postDetails_container">
        <div className="side_bar-container">
          <SideBar />
        </div>
        {isLoading ? (
          <div className="loading_container">
            <Loading />
          </div>
        ) : (
          <>
            <article className="postDetails_article">
              {showCommentsSection && (
                <PostComments
                  decreaseCommentCounter={decreaseCommentCounter}
                  addComment={addComment}
                  post_id={post_id}
                  closeComments={closeComments}
                />
              )}
              <div className="postDetails_article-content">
                <div className="postDetails_img-container">
                  <img src={postDetails.post_image} alt="" />
                </div>

                <div className="post_details">
                  <div className="post_title">
                    <h1>{postDetails.post_title}</h1>
                  </div>

                  <div className="post_desc">
                    <p>{postDetails.post_desc}</p>
                  </div>
                </div>
                <div className="post-reactions_btns">
                  <button onClick={() => manageLikes()}>
                    {postReactions.isLiked ? (
                      <i class="fa-solid fa-heart"></i>
                    ) : (
                      <i class="fa-regular fa-heart"></i>
                    )}

                    <span>{postReactions.likes}</span>
                  </button>

                  <button onClick={() => setShowCommentSection(true)}>
                    <i class="fa-regular fa-comment"></i>
                    <span>{postReactions.comments}</span>
                  </button>
                </div>
              </div>
            </article>
          </>
        )}
        <div className="mobile_nav-container home_nav">
          <MobileNav />
        </div>
      </div>
    </>
  );
};

export default PostDetails;
