const mongoose = require('mongoose');
require('mongoose-type-url');

const boardSchema = mongoose.Schema({
    // image_url: {
    //     work: mongoose.SchemaTypes.Image_url,
    //     profile: mongoose.SchemaTypes.Image_url
    // },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    comment: {
        type: String,
    },
    score: {
        type: Number,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    user_nick: {
        type: String,
        // required: true
    }
});

boardSchema.virtual('boardId').get(function() {
    return this._id.toHexString();
});

boardSchema.set('toJSON', {
    virtual: true
});

module.exports = mongoose.model('Board', boardSchema);