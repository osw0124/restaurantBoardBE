const mongoose = require('mongoose');;

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        match: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        default: "",
    },
    user_pwd: {
        type: String,
        match: /[A-Za-z0-9!@#*-_]{8,16}/,
        default: "",
    },
    user_nick: {
        type: String,
        match: /[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}/,
        default: "",
    }
});

module.exports = mongoose.model('User', userSchema);