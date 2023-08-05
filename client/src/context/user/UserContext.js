import React, { useState, createContext, useEffect } from 'react';
import checkAuth from '../../utils/checkAuth';
import { getUser } from '../../data/dataFetching';

export const UserContext = createContext();

export const UserStatus = (props) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    isAdmin: false,
    user_id: localStorage.getItem('user_id'),
    token: localStorage.getItem('token'),
  });

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const response = checkAuth(user.token);
    response.then((isLoggedIn) => {
      setUser({ ...user, isLoggedIn });
      if (isLoggedIn) {
        const details = getUser();
        details.then((res) => {
          setUserDetails(res);
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: [user, setUser],
        userInfo: [userDetails, setUserDetails],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
