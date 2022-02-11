const express = require('express');
const connect = require('./schemas');
const path = require('path');
const app = express();

const port = 3000;
const boardRouter = require('./routes/board');

connect();

app.use('/api', boardRouter);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/node_modules', express.static(path.join('/node_modules')));
