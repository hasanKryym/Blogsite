const localhost = 'http://localhost:5000/api/v1';
const cyclichost = 'https://blogsitee.cyclic.app/api/v1';

const deletePost = async (post_id) => {
  try {
    const response = await fetch(`${cyclichost}/posts/managePosts/${post_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  deletePost,
};
