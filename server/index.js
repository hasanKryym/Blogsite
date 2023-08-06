const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

// routers
const authentication = require('./routes/authentication');
const users = require('./routes/users');
const posts = require('./routes/posts');

// Middleware
const authorize = require('./middleware/authorization');

const cors = require('cors');

app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/v1/auth', authentication);
app.use('/api/v1/users', authorize, users);
app.use('/api/v1/posts', authorize, posts);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
