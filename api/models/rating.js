const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    rating: { type: Number, required: true },
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Rating', ratingSchema); 