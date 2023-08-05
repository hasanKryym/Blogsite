import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import ProfileHeader from './screens/ProfileHeader/ProfileHeader';
import MainScreen from './screens/ProfileContent/MainScreen';
import ProfileAside from './screens/ProfileAside/ProfileAside';
import MobileNav from '../../Mobile/MobileNav/MobileNav';
import Loading from '../../Loading/Loading';
import { UserContext } from '../../../context/user/UserContext';
import HomeLink from '../../Home/HomeLink/HomeLink';

const Profile = () => {
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="profile_container">
          <HomeLink />
          <ProfileHeader
            updateUserDetails={updateUserDetails}
            userDetails={userDetails}
          />
          <MainScreen />
          {/* <div className="profile_aside">
            <ProfileAside />
          </div> */}
          <div className="mobile_nav-container profile_nav">
            <MobileNav />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
