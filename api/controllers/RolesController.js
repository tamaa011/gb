const RolesModelObject = require("../classes/Models/RolesModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");


class RolesController {

    constructor() {
        this.rolesModel = new RolesModelObject()
        this.modelRef = this.rolesModel.modelRef
    }

    async listRoles(allRequestParams) {

        let getDataWithPaginationObj = {
            modelRef: this.modelRef,
            limit : allRequestParams.limit,
            offset : allRequestParams.offset
        }
        
        let roles = await this.rolesModel.getDataWithPagination(getDataWithPaginationObj)        
        return roles
    }
}

module.exports = new RolesController()
