import React, { useContext } from 'react';
import './MobileNav.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/user/UserContext';

const MobileNav = () => {
  const navigate = useNavigate();

  const { userData } = useContext(UserContext);
  const [user, setUser] = userData;

  const signOut = () => {
    setUser((prevState) => {
      return { ...prevState, isLoggedIn: false };
    });
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      <ul className="mobile-nav_list-container">
        <Link to="/">
          <li className="nav_list">
            {' '}
            <i className="fa-solid fa-house"></i>
          </li>
        </Link>
        {user.isLoggedIn && (
          <Link to="/profile">
            <li className="nav_list">
              <i class="fa-solid fa-user"></i>
            </li>
          </Link>
        )}
        <Link to="/posts/addPost">
          <li className="nav_list">
            <i className="fa-solid fa-plus"></i>
          </li>
        </Link>
        <Link to="/">
          <li className="nav_list">
            <i className="fa-solid fa-phone"></i>
          </li>
        </Link>

        {user.isLoggedIn ? (
          <Link onClick={() => signOut()}>
            <li className="nav_list">
              <i class="fa-solid fa-right-from-bracket"></i>
            </li>
          </Link>
        ) : (
          <Link to="/login">
            <li className="nav_list">
              <i class="fa-solid fa-right-to-bracket"></i>
            </li>
          </Link>
        )}
      </ul>
    </>
  );
};

export default MobileNav;
