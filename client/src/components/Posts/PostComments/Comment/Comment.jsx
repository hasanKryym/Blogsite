import React, { useContext } from 'react';
import './Comment.css';
import profileImg from '../../../../images/profile.jpg';
import { UserContext } from '../../../../context/user/UserContext';

const Comment = ({
  comment_content,
  comment_id,
  post_id,
  user_id,
  user_image,
  user_name,
  deleteComment,
}) => {
  const { deletePostComment } = require('../../../../data/dataDeleting');
  const { userInfo } = useContext(UserContext);
  const [userDetails, setUserDetails] = userInfo;
  return (
    <>
      <div className="comment">
        <div className="user_profile-info">
          {user_image ? (
            <img src={user_image} alt="" />
          ) : (
            <img src={profileImg} alt="" />
          )}
          <div className="user_comment">
            <h4>{user_name}</h4>
            <p>{comment_content}</p>
          </div>
        </div>
        {userDetails.user_id === user_id && (
          <button
            onClick={() => {
              deleteComment(comment_id);
              deletePostComment(comment_id);
            }}
            className="trash"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default Comment;
