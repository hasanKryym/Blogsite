import React, { useContext, useEffect, useState } from 'react';
import './MainScreen.css';
import Posts from './Posts/Posts';
import About from './About/About';
import { UserContext } from '../../../../../context/user/UserContext';

const MainScreen = () => {
  const [showPosts, setShowPosts] = useState(true);

  const { userData, userInfo } = useContext(UserContext);
  const [user, setUser] = userData;
  const [userDetails, setUserDetails] = userInfo;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userDetails) setIsLoading(false);
  }, []);

  const updateUserDetails = (details) => {
    setUserDetails({ ...userDetails, details });
  };
  return (
    <>
      <div className="profile_main_screen">
        <header>
          <ul className="Profile_navigation-list">
            <li onClick={() => setShowPosts(true)}>
              My Posts {showPosts && <span className="underline"></span>}
            </li>
            <li onClick={() => setShowPosts(false)}>
              About {!showPosts && <span className="underline"></span>}
            </li>
          </ul>
        </header>

        <section className="profile_content">
          {showPosts ? (
            <Posts
              updateUserDetails={updateUserDetails}
              userDetails={userDetails}
            />
          ) : (
            <About
              updateUserDetails={updateUserDetails}
              userDetails={userDetails}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default MainScreen;
