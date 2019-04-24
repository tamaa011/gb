const mongoose = require('mongoose');

const hallSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hallName: { type: String, required: true },
    hallAdress: { type: String, required: true },
    hallCategory: { type: String, required: true },
    hallImage: []
});

module.exports = mongoose.model('Hall', hallSchema); 