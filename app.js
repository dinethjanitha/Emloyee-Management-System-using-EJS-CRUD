const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRouter = require('./Routers/userRouter');
const homeRouter = require('./Routers/homeRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'This is is is is',
        saveUninitialized: true,
        resave: false,
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static('./uploads'));

app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/', userRouter);

module.exports = app;
