const RolesModelObject = require("../classes/Models/RolesModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");


class RolesController {

    constructor() {
        this.rolesModel = new RolesModelObject()
        this.modelRef = this.rolesModel.modelRef
    }

    async listRoles(params) {

        let getDataWithPaginationObj = {
            modelRef: this.modelRef,
            limit : params.limit,
            offset : params.offset
        }
        
        let roles = await this.rolesModel.getDataWithPagination(getDataWithPaginationObj)        
        return roles
    }
}

module.exports = new RolesController()
