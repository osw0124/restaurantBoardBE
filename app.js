const express = require('express');
const connect = require('./schemas');
const path = require('path');
const app = express();

const port = 3000;
const auth_router = require("./routes/auth");
const boardRouter = require('./routes/board');

const requestMiddlware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, '-', new Date());
    next();
};

connect();

app.use(express.json());
app.use(requestMiddlware);
app.use('/api', [boardRouter, auth_router]);
app.use(express.urlencoded({extended: true}));
// app.use(express.static(""));


app.use('/node_modules', express.static(path.join('/node_modules')));


app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});