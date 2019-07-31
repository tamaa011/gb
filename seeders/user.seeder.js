var Seeder = require('mongoose-data-seed').Seeder;
const user = require('../api/models/user');
const mongoose = require('mongoose');

var data = [{
    userName: "root",
    userEmail:"user@payme.com" ,
    userPassword:"123456789",
    userRole: mongoose.Types.ObjectId('5cf93d7712d19e20dc2ccb8f'),
    isAdmin: true,
}
];

var UserssSeeder = Seeder.extend({
  shouldRun: async function () {
    await user.deleteMany()
    return user.countDocuments().exec().then(count => count === 0);
  },
  run: function () {
    return user.create(data);
  }
});

module.exports = UserssSeeder;
