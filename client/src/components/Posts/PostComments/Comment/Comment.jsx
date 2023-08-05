import React from 'react';
import './Comment.css';
import profileImg from '../../../../images/profile.jpg';

const Comment = ({
  comment_content,
  comment_id,
  post_id,
  user_id,
  user_image,
  user_name,
}) => {
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
      </div>
    </>
  );
};

export default Comment;
