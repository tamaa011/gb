const BaseModel = require("./BaseModel");
const rolesActions = require('../../models/rolesActions');

class RolesModelObject extends BaseModel {

    constructor() {
        super();
        this.modelRef = rolesActions

    }

}
module.exports = RolesModelObject