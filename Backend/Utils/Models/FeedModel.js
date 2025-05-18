const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        trim: true,
    },
}, { timestamps: true });

const FeedModel = mongoose.model('Feeds', feedSchema);
module.exports = FeedModel;
