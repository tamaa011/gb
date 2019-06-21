var Seeder = require('mongoose-data-seed').Seeder;
const category = require('../api/models/category');
const mongoose = require('mongoose');

var data = [{
  _id: mongoose.Types.ObjectId('5d0cbfc9a758321414bf9871'),
  name: "Hotel"
},
{
  _id: mongoose.Types.ObjectId('5d0cbfc9a758321414bf9872'),
  name: "Club"
},
{
  _id: mongoose.Types.ObjectId('5d0cbfc9a758321414bf9873'),
  name: "Yacht"
},
{
  _id: mongoose.Types.ObjectId('5d0cbfc9a758321414bf9874'),
  name: "Villa"
},
{
  _id: mongoose.Types.ObjectId('5d0cbfc9a758321414bf9875'),
  name: "Open area"
},
{
  _id: mongoose.Types.ObjectId('5d0cbfc9a758321414bf9876'),
  name: "Individual"
}
];

var CategoriesSeeder = Seeder.extend({
  shouldRun: async function () {
    await category.deleteMany()
    return category.countDocuments().exec().then(count => count === 0);
  },
  run: function () {
    return category.create(data);
  }
});

module.exports = CategoriesSeeder;
