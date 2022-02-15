const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user_nick: {
        type: String
    },
    user_comment: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
})

module.exports = mongoose.model('Comment', commentSchema);