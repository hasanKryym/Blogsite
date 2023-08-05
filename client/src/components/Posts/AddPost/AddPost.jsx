import React, { useContext, useState } from 'react';
import './AddPost.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AddImage from '../../../data/AddImage';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../../../data/dataPosting';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MobileNav from '../../Mobile/MobileNav/MobileNav';
import { CategoriesContext } from '../../../context/posts/CategoriesContext';
import HomeLink from '../../Home/HomeLink/HomeLink';

const AddPost = () => {
  const navigate = useNavigate();

  const { categoriesData } = useContext(CategoriesContext);
  const [categories, setCategories] = categoriesData;

  const [inputs, setInputs] = useState({
    post_title: '',
    post_desc: '',
    post_image: '',
    post_date: '',
    category_id: '',
  });

  const { post_title, post_desc, post_image, post_date, category_id } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [choosenCategory, setChoosenCategory] = useState('category');

  const [showCategoryList, setShowCategoryList] = useState(false);

  const setPostImage = (url) => {
    setInputs((prevState) => {
      return { ...prevState, post_image: url };
    });
  };

  const manageChoosenCategory = (e) => {
    setChoosenCategory(e.target.innerHTML);
    setShowCategoryList(false);
    setInputs((prevState) => {
      return { ...prevState, category_id: e.target.id };
    });
  };

  const addNewPost = (e) => {
    e.preventDefault();

    const allowPost = post_title && post_desc && post_image && category_id;

    if (!allowPost)
      return toast.info('please fill all the inputs', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

    const add = addPost(inputs);
    add.then((res) => {
      if (res.success) {
        toast.success('Post created successfully', {
          position: 'top-right',
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        toast.error('An error occurred please try again later', {
          position: 'top-right',
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      }
    });
  };
  return (
    <>
      <HomeLink />
      <form className="create_post-form">
        <input
          autoComplete="off"
          className="post_title"
          type="title"
          placeholder={'Post Title'}
          name="post_title"
          value={post_title}
          onChange={(e) => onChange(e)}
        />
        <span>Description:</span>
        <ReactQuill
          value={post_desc}
          onChange={(e) => setInputs({ ...inputs, post_desc: e })}
        />
        <span>
          Add image:{' '}
          <span>
            <AddImage setPostImage={setPostImage} />
          </span>{' '}
        </span>

        <div className="add_post-post_category">
          <button
            type="text"
            onClick={(e) => {
              e.preventDefault();
              setShowCategoryList(!showCategoryList);
            }}
            className="category_btn"
          >
            {choosenCategory}
            <span>
              <i className="fa-solid fa-caret-down"></i>
            </span>
          </button>
          {showCategoryList && (
            <ul className="category_list">
              {categories.map((category) => {
                return (
                  <li
                    onClick={(e) => manageChoosenCategory(e)}
                    id={category.category_id}
                    key={category.category_id}
                  >
                    {category.category_name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button onClick={addNewPost}>Create Post</button>
      </form>
      <div className="mobile_nav-container home_nav">
        <MobileNav />
      </div>
      <ToastContainer />
    </>
  );
};

export default AddPost;
