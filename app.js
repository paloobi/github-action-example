const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

const apiRouter = require('./api');
app.use('/api', apiRouter);

module.exports = app;