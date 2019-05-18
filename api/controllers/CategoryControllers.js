const CategoryModelObject = require("../classes/Models/CategoryModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");


class CategoryControllers {

    constructor() {
        this.categoryModel = new CategoryModelObject()
        this.modelRef = this.categoryModel.modelRef
    }

    async findCategory(params) {

        let getDataWithQueryObj = {
            modelRef: this.modelRef,
            query: params
        }
        
        let category = await this.categoryModel.getDataWithQuery(getDataWithQueryObj)
        return category


    }


}

module.exports = new CategoryControllers()
