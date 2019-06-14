const mongoose = require('mongoose');

const policyAndPrivacySchema = mongoose.Schema({
    text: { type: String, required: true , maxLength :10000},
    type: { type: String, required: true ,enum :['privacy' , 'service']}
});

module.exports = mongoose.model('PolicyAndPrivacy', policyAndPrivacySchema); 