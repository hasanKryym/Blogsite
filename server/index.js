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
const corsOptions = {
  // origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cors(corsOptions));

// ROUTES
app.use('/api/v1/auth', authentication);
app.use('/api/v1/users', authorize, users);
app.use('/api/v1/posts', authorize, posts);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
