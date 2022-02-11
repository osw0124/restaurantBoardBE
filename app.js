const express = require("express");
const connect = require("./schemas/index");
const auth_router = require("./routes/auth");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;


app.use(express.json());
app.use("/register", express.urlencoded({extended:false}), auth_router);
// app.use(express.static(""));


app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!");
});