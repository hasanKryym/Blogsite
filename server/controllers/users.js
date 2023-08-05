const pool = require('../db/connect');

const getUser = async (req, res) => {
  try {
    const user_id = req.user;
    let user = await pool.query(
      'SELECT user_id, user_name, user_email, user_address, user_number, gender_id FROM users WHERE user_id = $1',
      [user_id]
    );
    user = user.rows[0];
    if (user) return res.status(200).json(user);
    return res.status(404).json({ success: false, msg: 'user not found' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const getUserById = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    let userName = await pool.query(
      'SELECT user_name FROM users WHERE user_id = $1',
      [user_id]
    );
    userName = userName.rows[0];
    if (userName) return res.status(200).json(userName);
    return res.status(404).json({ success: false, msg: 'user not found' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user_id = req.user;
    let posts = await pool.query(
      'SELECT * from posts WHERE user_id = $1 ORDER BY lastmodified DESC',
      [user_id]
    );
    posts = posts.rows;
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

const editUser = async (req, res) => {
  try {
    const user_id = req.user;
    const { user_name, user_address, user_number } = req.body;

    await pool.query(
      'UPDATE users SET user_name = $1, user_address = $2, user_number = $3 WHERE user_id = $4',
      [user_name, user_address, user_number, user_id]
    );

    return res
      .status(200)
      .json({ success: true, msg: 'user updated successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('server error');
  }
};

module.exports = {
  getUser,
  getUserById,
  getUserPosts,
  editUser,
};
