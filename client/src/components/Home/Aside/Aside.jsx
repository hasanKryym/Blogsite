import React, { useEffect, useState, useCallback } from 'react';
import './Aside.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import RecentPost from './RecentPost';
import Categories from '../../Posts/Categories/Categories';
import {
  getPopularPosts,
  getRecentPosts,
  searchPosts,
} from '../../../data/dataFetching';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

const Aside = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const response = getRecentPosts();
    response.then((res) => {
      setRecentPosts(res);
    });

    const popular_posts = getPopularPosts();
    popular_posts.then((res) => {
      setPopularPosts(res);
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchDebounced = useCallback(
    debounce((query) => {
      const response = searchPosts(query);
      response.then((res) => {
        setSearchResult(res);
      });
      // console.log('Debounced search for:', query);
    }, 500),
    []
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchDebounced(query);
  };

  return (
    <>
      <aside className="home_page-aside">
        <div className="home_page-aside-search_bar-container">
          <input
            placeholder="Search"
            className="home_page-aside-search_bar"
            type="text"
            list="suggestions"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {/* <span className="search_bar-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span> */}
          {searchResult.length !== 0 && (
            <ul className="search_results">
              {searchResult.map(({ post_id, post_title }) => {
                return (
                  <Link to={`/posts/postDetails/${post_id}`}>
                    <li id={post_id} key={post_id}>
                      {post_title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          )}
        </div>
        <div className="popular_posts-container">
          <h3>popular posts</h3>
          <div className="slider">
            <AliceCarousel
              autoPlay
              infinite
              autoPlayInterval={4000}
              disableButtonsControls
              touchMoveDefaultEvents
            >
              {popularPosts.map((post) => {
                return (
                  <>
                    <Link
                      to={`/posts/postDetails/${post.post_id}`}
                      key={post.post_id}
                    >
                      <div className="image_container">
                        <img
                          className="popular_posts-image"
                          src={post.post_image}
                          alt=""
                        />
                        <div className="image_content">
                          <h3>{post.post_title}</h3>
                          <p>{post.post_desc}</p>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </AliceCarousel>
          </div>
        </div>
        <div className="post_categories">
          <h3>Categories</h3>
          <Categories />
        </div>
        <div className="recent_posts-container">
          <h3>recent posts</h3>
          {recentPosts.map((post) => {
            return <RecentPost key={post.post_id} {...post} />;
          })}
        </div>
      </aside>
    </>
  );
};

export default Aside;
