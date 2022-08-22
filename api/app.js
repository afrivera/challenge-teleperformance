const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const { dbConnection } = require('./db');


// routes
const indexRouter = require('./routes');

// Port
const port = process.env.PORT || 3000;

const app = express();

// connect database
dbConnection()

app.use(cors());

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', indexRouter);

app.listen(port, ()=> {
    console.log(`Server running in port ${ port }`);
})

module.exports = app;
