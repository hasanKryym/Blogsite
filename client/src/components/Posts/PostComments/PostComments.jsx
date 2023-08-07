import React, { useContext, useEffect, useState } from 'react';
import './PostComments.css';
import { addPostComment } from '../../../data/dataPosting';
import { getPostComments } from '../../../data/dataFetching';
import Comment from './Comment/Comment';
import { UserContext } from '../../../context/user/UserContext';

const PostComments = ({ post_id, closeComments, addComment }) => {
  const [postComments, setPostComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const { userInfo } = useContext(UserContext);
  const [userDetails, setUserDetails] = userInfo;
  const [isLoading, setIsLoading] = useState(true);

  const postComment = async () => {
    if (!commentContent) return;

    await addPostComment(post_id, commentContent);
    setCommentContent('');
    const post_comments = getPostComments(post_id);
    post_comments.then((res) => {
      setPostComments(res);
    });
    addComment();
  };
  useEffect(() => {
    const post_comments = getPostComments(post_id);
    post_comments.then((res) => {
      console.log(res);
      setPostComments(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <section className="post_comments-container">
        <button onClick={() => closeComments()} className="close_comments-btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="comments_container">
          {isLoading ? (
            isLoading
          ) : (
            <>
              {postComments.length !== 0 ? (
                postComments.map((comment) => {
                  return <Comment key={comment.comment_id} {...comment} />;
                })
              ) : (
                <span>no comments</span>
              )}
            </>
          )}
        </div>

        <div className="input_container">
          <input
            placeholder="Enter your comment"
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button onClick={() => postComment()} className="button post_comment">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default PostComments;
