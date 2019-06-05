const mongoose = require('mongoose');

const actionsSchema = mongoose.Schema({
    Halls: { type: [String], required: true },
    Users: { type: [String], required: true },
    Admin: { type: [String], required: true }

});

const rolesSchema = mongoose.Schema({
    role: { type: String, required: true },
    actions: [actionsSchema]

});



module.exports = mongoose.model('RolesActions', rolesSchema); 