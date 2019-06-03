const CategoryModelObject = require("../classes/Models/CategoryModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");


class CategoryController {

    constructor() {
        this.categoryModel = new CategoryModelObject()
        this.modelRef = this.categoryModel.modelRef
    }

    async findCategory(allRequestParams) {

        let getDataWithQueryObj = {
            modelRef: this.modelRef,
            query: allRequestParams
        }

        let category = await this.categoryModel.isExist(getDataWithQueryObj)
        return category

    }


    async listCategories(allRequestParams) {

        let getDataWithPaginationParams = {
            limit: allRequestParams.limit,
            offset: allRequestParams.offset,
            modelRef: this.modelRef
        }
        let categoriesArray = await this.categoryModel.getDataWithPagination(getDataWithPaginationParams);
        return categoriesArray

    }


    @_applyValidators({ 'required': ['name'] })
    async addCategory(allRequestParams) {

        let getDataWithPaginationParams = {
            data: [{ name: allRequestParams.name }],
            modelRef: this.modelRef
        }
        let categoriesArray = await this.categoryModel.insertData(getDataWithPaginationParams);
        return categoriesArray

    }
}



module.exports = new CategoryController()
