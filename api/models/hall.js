const mongoose = require('mongoose');


const hallSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hallName: { type: String, required: true, index: true },
    hallAdress: { type: String, required: true },
    hallCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    hallDescription: { type: String, required: true },
    hallPrice: { type: Number, required: true },
    hallLocationLong: { type: String, required: true },
    hallLocationLat: { type: String, required: true },
    hallSpecialOffers: { type: String },
    hallPhoneNumber: { type: String, required: true },
    hallsAverageRating: { type: Number, require: true, default: 0 },
    hallsRatingCounter: { type: Number, require: true, default: 0 },
    hallImage: []
});

hallSchema.index({ "hallsAverageRating": -1, "hallsRatingCounter": -1 })

module.exports = mongoose.model('Hall', hallSchema); 