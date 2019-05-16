var mongooseLib = require('mongoose');
const category = require('./seeders/categories.seeder');
const hall = require('./seeders/halls.seeder');

mongooseLib.Promise = global.Promise || Promise;
const dotenv = require('dotenv');
dotenv.config();

module.exports = {

  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/dbname',

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    category,
    hall
  }
};