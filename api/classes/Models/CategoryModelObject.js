const BaseModel = require("./BaseModel");
const category = require('../../models/category');

class CategoryModelObject extends BaseModel {

    constructor() {
        super();
        this.modelRef = category
    }

}
module.exports = CategoryModelObject