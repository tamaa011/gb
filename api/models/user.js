const mongoose = require('mongoose');
const EncryptService = require("../classes/services/EncryptService");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required: true },
    userEmail: {
        type: String,
        required: true,
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    userPassword: { type: String, required: true },
    userRole: { type: mongoose.Schema.Types.ObjectId, ref: 'RolesActions' }
});

userSchema.pre('save', async function (next) {

    this._doc.userPassword = await EncryptService.hashText(this._doc.userPassword);
    next();
})

module.exports = mongoose.model('User', userSchema); 