import React, { useContext, useState } from 'react';
import './SideBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user/UserContext';

const SideBar = () => {
  const navigate = useNavigate();

  const { userData } = useContext(UserContext);
  const [user, setUser] = userData;
  const [showSideBar, setShowSideBar] = useState(false);

  const signOut = () => {
    setUser((prevState) => {
      return { ...prevState, isLoggedIn: false };
    });
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      <nav
        style={
          showSideBar
            ? { width: 25 + '%', minWidth: '200px' }
            : { width: '55px' }
        }
        className="side_bar"
      >
        <button
          onClick={() => setShowSideBar(!showSideBar)}
          className="side_bar-arrow"
        >
          {showSideBar ? (
            <i className="fa-solid fa-chevron-left"></i>
          ) : (
            <i className="fa-solid fa-chevron-right"></i>
          )}
        </button>
        {showSideBar ? (
          <div className="nav_container">
            <div className="header">
              <h2 className="side_bar-title">Daily blog</h2>
              <h4 className="side_bar-desc secondaryText">
                Enjoy your journey
              </h4>
            </div>

            <div className="nav_links">
              <ul className="nav_list-container">
                <Link to="/">
                  <li className="nav_list">
                    {' '}
                    <span>
                      <i className="fa-solid fa-house"></i>
                    </span>{' '}
                    homepage
                  </li>
                </Link>
                {user.isLoggedIn && (
                  <Link to="/profile">
                    <li className="nav_list">
                      {' '}
                      <span>
                        <i class="fa-solid fa-user"></i>
                      </span>{' '}
                      Profile
                    </li>
                  </Link>
                )}
                <Link to="/posts/addPost">
                  <li className="nav_list">
                    {' '}
                    <span>
                      <i className="fa-solid fa-plus"></i>
                    </span>{' '}
                    Add Post
                  </li>
                </Link>
                <Link to="/">
                  <li className="nav_list">
                    {' '}
                    <span>
                      <i className="fa-solid fa-phone"></i>
                    </span>{' '}
                    contact us
                  </li>
                </Link>

                {user.isLoggedIn ? (
                  <Link onClick={() => signOut()}>
                    <li className="nav_list">
                      {' '}
                      <span>
                        <i class="fa-solid fa-right-from-bracket"></i>
                      </span>{' '}
                      sign out
                    </li>
                  </Link>
                ) : (
                  <Link to="/login">
                    <li className="nav_list">
                      {' '}
                      <span>
                        <i class="fa-solid fa-right-to-bracket"></i>
                      </span>{' '}
                      sign in
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="side_bar-icon_container">
            <ul className="nav_list-container">
              <Link to="/">
                <li title="Home" className="nav_list nav_icons">
                  <i className="fa-solid fa-house"></i>
                </li>
              </Link>

              {user.isLoggedIn && (
                <Link to="/profile">
                  <li title="profile" className="nav_list nav_icons">
                    <i class="fa-solid fa-user"></i>
                  </li>
                </Link>
              )}
              <Link to="/posts/addPost">
                <li title="Add Post" className="nav_list nav_icons">
                  <i class="fa-solid fa-plus"></i>
                </li>
              </Link>

              <Link to="/">
                <li title="contact us" className="nav_list nav_icons">
                  <i className="fa-solid fa-phone"></i>
                </li>
              </Link>
            </ul>

            {user.isLoggedIn ? (
              <div className="sign_in-icon">
                <Link onClick={() => signOut()}>
                  <li title="sign out" className="nav_list nav_icons">
                    <i class="fa-solid fa-right-from-bracket"></i>
                  </li>
                </Link>
              </div>
            ) : (
              <div className="sign_in-icon">
                <Link to="/login">
                  <li title="sign in" className="nav_list nav_icons">
                    <i class="fa-solid fa-right-to-bracket"></i>
                  </li>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default SideBar;
