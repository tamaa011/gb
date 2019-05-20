const mongoose = require('mongoose');

const routesSchema = mongoose.Schema({
    route: { type: String, required: true },
    actions: { type: String, required: true },

});



module.exports = mongoose.model('RoutesActions', routesSchema); 