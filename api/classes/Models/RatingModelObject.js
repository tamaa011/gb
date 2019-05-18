const BaseModel = require("./BaseModel");
const rating = require('../../models/rating');

class RatingModelObject extends BaseModel {

     constructor() {
        super();
        this.modelRef = rating

    }

}
module.exports = RatingModelObject