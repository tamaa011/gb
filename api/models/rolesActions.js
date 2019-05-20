const mongoose = require('mongoose');

const actionsSchema = mongoose.Schema({
    name: { type: String, required: true },
});

const rolesSchema = mongoose.Schema({
    role: { type: String, required: true },
    actions: [actionsSchema]

});



module.exports = mongoose.model('RolesActions', rolesSchema); 