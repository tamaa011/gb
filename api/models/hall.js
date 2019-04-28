const mongoose = require('mongoose');

const hallSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hallName: { type: String, required: true },
    hallAdress: { type: String, required: true },
    hallCategory: { type: String, required: true },
    hallDescription: { type: String, required: true },
    hallPrice: { type: String, required: true },
    hallLocationLong: { type: String, required: true },
    hallLocationLat: { type: String, required: true },
    hallSpecialOffers: { type: String},
    hallImage: []
});

module.exports = mongoose.model('Hall', hallSchema); 