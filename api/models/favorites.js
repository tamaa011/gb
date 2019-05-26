const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
    hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

favoritesSchema.index({ "hallId": 1, "userId": 1 }, { "unique": true })

module.exports = mongoose.model('Favorites', favoritesSchema); 