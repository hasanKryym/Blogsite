import React, { useContext, useEffect, useState } from 'react';
import './Login_register.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user/UserContext';
import { CategoriesContext } from '../../context/posts/CategoriesContext';
// import { getPostsCategories, getUser } from '../../data/dataFetching';

const SignUp = () => {
  const { getPostsCategories, getUser } = require('../../data/dataFetching');

  const localhost = 'http://localhost:5000/api/v1';
  const cyclichost = 'https://blogsitee.cyclic.app/api/v1';
  const navigate = useNavigate();
  const { userData, userInfo } = useContext(UserContext);
  const [user, setUser] = userData;
  const { categoriesData } = useContext(CategoriesContext);
  const [categories, setCategories] = categoriesData;
  const [userDetails, setUserDetails] = userInfo;
  const maleGender_id = '73e9dae5-6c16-4ee8-ac0a-1d6275a58e4c';
  const femaleGender_id = 'dde12f85-2fb6-4388-acf1-ed1727928a2d';

  const [inputs, setInputs] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    user_address: '',
    user_number: '',
    gender_id: null,
  });

  const {
    user_name,
    user_email,
    user_password,
    user_address,
    user_number,
    gender_id,
  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (
        user_name &&
        user_email &&
        user_password &&
        user_address &&
        user_number
      ) {
        const body = {
          user_name,
          user_email,
          user_password,
          user_address,
          user_number,
          gender_id,
        };
        const response = await fetch(`${cyclichost}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const parseRes = await response.json();

        if (!parseRes.success) {
          alert('email already exists');
          setInputs({
            ...inputs,
            user_name: '',
            user_email: '',
            user_password: '',
            user_address: '',
            user_number: '',
            gender_id: null,
          });
        } else if (parseRes.token) {
          localStorage.setItem('token', parseRes.token);
          localStorage.setItem('user_id', parseRes.user_id);
          setUser({
            ...user,
            isLoggedIn: true,
            user_id: parseRes.user_id,
            token: parseRes.token,
          });

          const userData = getUser(parseRes.user_id);

          userData.then((res) => {
            setUserDetails(res);
          });

          const fetchCategories = getPostsCategories();
          fetchCategories.then((res) => {
            setCategories(res);
          });
          navigate('/');
        }
      } else {
        alert('please fill all the inputs');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="form_container">
        <form className="form" onSubmit={register}>
          <p className="form-title">Sign Up</p>

          <div className="input-container">
            <input
              type="text"
              name="user_name"
              placeholder="Full name"
              value={user_name}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="input-container">
            <input
              type="email"
              name="user_email"
              placeholder="email"
              value={user_email}
              onChange={(e) => onChange(e)}
            />
            <span></span>
          </div>

          <div className="input-container">
            <input
              type="password"
              name="user_password"
              placeholder="password"
              value={user_password}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              name="user_address"
              placeholder="address"
              value={user_address}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              name="user_number"
              placeholder="Phone"
              value={user_number}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div class="radio-container">
            <div class="radio-wrapper">
              <label class="radio-button">
                <input
                  type="radio"
                  name="radio-group"
                  id="option1"
                  onClick={() =>
                    setInputs({ ...inputs, ['gender_id']: maleGender_id })
                  }
                />
                <span class="radio-checkmark"></span>
                <span class="radio-label">Male</span>
              </label>
            </div>

            <div class="radio-wrapper">
              <label class="radio-button">
                <input
                  type="radio"
                  name="radio-group"
                  id="option2"
                  onClick={() =>
                    setInputs({ ...inputs, ['gender_id']: femaleGender_id })
                  }
                />
                <span class="radio-checkmark"></span>
                <span class="radio-label">Female</span>
              </label>
            </div>

            <div class="radio-wrapper">
              <label class="radio-button">
                <input
                  type="radio"
                  name="radio-group"
                  id="option3"
                  onClick={() => setInputs({ ...inputs, ['gender_id']: null })}
                />
                <span class="radio-checkmark"></span>
                <span class="radio-label">Prefer not to say</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit">
            Sign up
          </button>

          <p className="signup-link">
            Already have account?
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
