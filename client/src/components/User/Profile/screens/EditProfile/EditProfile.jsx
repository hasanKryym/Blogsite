import React, { useContext, useEffect, useState } from 'react';
import './EditProfile.css';
import { UserContext } from '../../../../../context/user/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../../Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
// import { editUser } from '../../../../../data/dataPosting';

const EditProfile = () => {
  const { editUser } = require('../../../../../data/dataPosting');

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useContext(UserContext);
  const [userDetails, setUserDetails] = userInfo;
  const [inputs, setInputs] = useState({
    user_name: '',
    user_address: '',
    user_number: '',
  });

  const { user_name, user_address, user_number } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setInputs({
      ...inputs,
      user_name: userDetails.user_name,
      user_address: userDetails.user_address,
      user_number: userDetails.user_number,
    });

    setIsLoading(false);
  }, [userDetails]);

  const edit = (e) => {
    e.preventDefault();
    const flag = user_name && user_address && user_number;
    if (flag) {
      editUser(inputs);
      setUserDetails({ ...userDetails, user_name, user_address, user_number });
      navigate('/profile');
    } else
      toast.info('Please fill all the inputs', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  };

  return (
    <>
      <div className="form_container">
        {isLoading ? (
          <Loading />
        ) : (
          <form className="form" onSubmit={(e) => edit(e)}>
            <p className="form-title">Edit Profile</p>

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

            {/* <div class="radio-container">
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
          </div> */}

            <button type="submit" className="submit">
              Edit
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProfile;
