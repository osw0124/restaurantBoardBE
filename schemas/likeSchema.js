const mongoose = require('mongoose');;

const likeSchema = new mongoose.Schema({
    user_nick: {
        type: mongoose.Schema.Types.String,
        ref: "User",
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,        
        ref: "Board",
    }
});

module.exports = mongoose.model('Like', likeSchema);