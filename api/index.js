const express = require('express');
const path = require('path');

const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    res.send('API is running');
});

// /api/users
apiRouter.use('/users', require('./users'));

// /api/listings
apiRouter.use('/listings', require('./listings'));

module.exports = apiRouter;