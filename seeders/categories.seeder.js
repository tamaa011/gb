var Seeder = require('mongoose-data-seed').Seeder;
const category = require('../api/models/category');

var data = [{
  name: "Hotel"
},
{
  name: "Club"
},
{
  name: "Yacht"
},
{
  name: "Villa"
},
{
  name: "Open area"
},
{
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
