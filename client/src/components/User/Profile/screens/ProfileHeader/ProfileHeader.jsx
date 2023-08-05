import React from 'react';
import './ProfileHeader.css';
import { Link } from 'react-router-dom';
import profileImg from '../../../../../images/profile.jpg';

const ProfileHeader = ({ userDetails, updateUserDetails }) => {
  const {
    user_id,
    user_name,
    user_email,
    user_address,
    user_number,
    gender_id,
  } = userDetails;

  return (
    <>
      <header className="profile_header-container">
        <div className="profile_image-container">
          <img src={profileImg} alt="" />
        </div>

        <div className="profile_header-content">
          <h3 className="user_name">
            {user_name + ' '}
            <span className="user_location">
              <i class="fa-solid fa-location-dot"></i> {user_address}
            </span>
          </h3>
          {/* <h6 className="user_work">Web Developer</h6> */}
          <h4 className="user_connections">
            connections <span>(0)</span>
          </h4>
        </div>
        <div className="profile_header-btns_container">
          <Link to={`edit`}>
            <button className="button profile_btn">Edit Profile</button>
          </Link>
          <Link to="/posts/addPost">
            <button className="button profile_btn">Add Post </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default ProfileHeader;
