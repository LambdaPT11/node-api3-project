const express = require('express');
const middleware = require('./middleware/middleware.js');
const userRouter = require('./users/userRouter.js');

const server = express();
const logger = middleware.logger;


// middleware - built in
server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter)

// This get call works postman
server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
