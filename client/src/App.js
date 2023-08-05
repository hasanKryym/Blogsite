import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/login-register/Login';
import SignUp from './components/login-register/SignUp';
import { UserStatus } from './context/user/UserContext';
import Profile from './components/User/Profile/Profile';
import AddPost from './components/Posts/AddPost/AddPost';
import PostDetails from './components/Posts/PostDetails/PostDetails';
import { CategoriesStatus } from './context/posts/CategoriesContext';
import EditProfile from './components/User/Profile/screens/EditProfile/EditProfile';

function App() {
  return (
    <>
      <UserStatus>
        <CategoriesStatus>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:category_id" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/posts/addPost" element={<AddPost />} />
              <Route path="/posts/postDetails/:id" element={<PostDetails />} />
            </Routes>
          </Router>
        </CategoriesStatus>
      </UserStatus>
    </>
  );
}

export default App;
