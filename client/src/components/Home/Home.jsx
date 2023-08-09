import { React, useContext, useEffect, useState } from 'react';
import './Home.css';
import { UserContext } from '../../context/user/UserContext';
import SideBar from '../SideBar/SideBar';
import Posts from '../Posts/Posts';
import Aside from './Aside/Aside';
import { useParams, useNavigate } from 'react-router-dom';
import MobileNav from '../Mobile/MobileNav/MobileNav';

const Home = () => {
  const { userData } = useContext(UserContext);
  const [user, setUser] = userData;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) navigate('/login');
  }, [user]);

  const params = useParams();
  let category_id = params.category_id;
  if (!category_id) category_id = 'all';

  return (
    <>
      <div className="home_container">
        <div className="side_bar-container">
          <SideBar />
        </div>

        <div className="home_content">
          <Posts category_id={category_id} />

          <div className="home_page_aside-container">
            <Aside />
          </div>
        </div>

        <div className="mobile_nav-container home_nav">
          <MobileNav />
        </div>
      </div>
    </>
  );
};

export default Home;
