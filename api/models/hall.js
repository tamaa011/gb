const mongoose = require('mongoose');


const hallSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hallName: { type: String, required: true },
    hallAdress: { type: String, required: true },
    hallCategory: { type:mongoose.Schema.Types.ObjectId, ref: 'Category' },
    hallDescription: { type: String, required: true },
    hallPrice: { type: String, required: true },
    hallLocationLong: { type: String, required: true },
    hallLocationLat: { type: String, required: true },
    hallSpecialOffers: { type: String },
    hallPhoneNumber: { type: String, required:  true },
    hallImage: []
});


module.exports = mongoose.model('Hall', hallSchema); 