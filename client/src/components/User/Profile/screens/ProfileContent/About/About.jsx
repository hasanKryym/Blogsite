import React from 'react';
import './About.css';

const About = ({ userDetails, updateUserDetails }) => {
  const {
    user_id,
    user_name,
    user_email,
    user_address,
    user_number,
    gender_id,
  } = userDetails;

  const maleGender_id = '73e9dae5-6c16-4ee8-ac0a-1d6275a58e4c';

  const femaleGender_id = 'dde12f85-2fb6-4388-acf1-ed1727928a2d';

  return (
    <>
      <section className="profile_about-container">
        <div className="profile-info">
          <h5 className="profile_contact-info_title">contact information</h5>
          <h4>
            Email: <a href={`mailto: ${user_email}`}>{user_email}</a>
          </h4>
          <h4>
            Phone: <a href="tel:81081882">{user_number}</a>
          </h4>
          <h4>
            Address: <span>{user_address}</span>
          </h4>
        </div>

        {gender_id && (
          <div className="profile-info">
            <h5 className="profile_contact-info_title">Basic information</h5>
            {/* <h4>
            Birthday: <span>October 26, 2003</span>
          </h4> */}
            <h4>
              Gender:{' '}
              <span>{gender_id === maleGender_id ? 'Male' : 'Female'}</span>
            </h4>
          </div>
        )}
      </section>
    </>
  );
};

export default About;
