const express = require("express");
const connect = require("./schemas/index");
const auth_router = require("./routes/auth");

const app = express();
const port = 3000;


const requestMiddlware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, '-', new Date());
    next();
};


connect();

app.use(express.json());
app.use(requestMiddlware);
app.use('/api', [auth_router]);
// app.use(express.static(""));





app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});