const BaseModel = require("./BaseModel");
const hall = require('../../models/hall');

class HallsModelObject extends BaseModel {

    constructor() {
        super();
        this.modelRef = hall
    }

}
module.exports = HallsModelObject