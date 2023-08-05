const deletePost = async (post_id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/posts/managePosts/${post_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    const parseRes = await response.json();
    return parseRes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  deletePost,
};
