const CategoryModelObject = require("../classes/Models/CategoryModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");


class CategoryController {

    constructor() {
        this.categoryModel = new CategoryModelObject()
        this.modelRef = this.categoryModel.modelRef
    }

    async findCategory(params) {

        let getDataWithQueryObj = {
            modelRef: this.modelRef,
            query: params
        }
        
        let category = await this.categoryModel.isExist(getDataWithQueryObj)
        return category


    }


}

module.exports = new CategoryController()
