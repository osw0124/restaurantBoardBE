const mongoose = require('mongoose');;

const likeSchema = new mongoose.Schema({
    user_nick: {
        type: mongoose.Schema.Types.String,
        ref: "User",
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,        
        ref: "Board",
    },
    like_count: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Like', likeSchema);