const BaseModel = require("./BaseModel");
const user = require('../../models/user');

class UsersModelObject extends BaseModel {

    constructor() {
        super();
        this.modelRef = user

    }

}
module.exports = UsersModelObject