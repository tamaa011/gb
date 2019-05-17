const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
   hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Favorites', favoritesSchema); 