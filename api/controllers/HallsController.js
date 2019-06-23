const HallsModelObject = require("../classes/Models/HallsModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");
const _filter = require("../classes/Decorators/filterObject");
const CategoryControllers = require("./CategoryController");
class HallsController {

    constructor() {
        this.hallsModel = new HallsModelObject()
        this.modelRef = this.hallsModel.modelRef
    }

    async hallsListing(allRequestParams) {

        let getDataWithPaginationAndJoinAndSortParams = {
            limit: allRequestParams.limit,
            offset: allRequestParams.offset,
            modelRef: this.modelRef,
            sortObj: { "hallsAverageRating": -1, "hallsRatingCounter": -1 },
            modelToJoinRef: "hallCategory"
        }
        let hallsArray = await this.hallsModel.getDataWithPaginationAndJoinAndSort(getDataWithPaginationAndJoinAndSortParams);
        return hallsArray
    }

    @_applyValidators({ 'required': ['hallName'] })
    async searchByName(allRequestParams) {

        allRequestParams.hallName = allRequestParams.hallName.toLowerCase()
        let searchByNameParams = {
            limit: allRequestParams.limit,
            offset: allRequestParams.offset,
            fieldValue: allRequestParams.hallName,
            fieldName: "hallName",
            sortField: "hallsAverageRating",
            sortOrder: -1,
            modelRef: this.modelRef,
            modelToJoinRef: "hallCategory"
        }

        let hallsArray = await this.hallsModel.likeSearchDataWithFieldAndJoinAndSort(searchByNameParams);

        if (!hallsArray || !hallsArray.length)
            throw new Error("hall with this name not found")

        return hallsArray

    }


    @_applyValidators({ 'required': ['hallCategory'] })
    async searchByCategory(allRequestParams) {

        let searchByNameParams = {
            limit: allRequestParams.limit,
            offset: allRequestParams.offset,
            fieldValue: allRequestParams.hallCategory,
            fieldName: "hallCategory",
            sortField: "hallsAverageRating",
            sortOrder: -1,
            modelRef: this.modelRef,
            modelToJoinRef: "hallCategory"
        }

        let hallsArray = await this.hallsModel.searchDataWithFieldAndJoinAndSort(searchByNameParams);

        if (!hallsArray || !hallsArray.length)
            throw new Error("hall with this category not found")

        return hallsArray

    }

    @_applyValidators({ 'min': [['hallPrice'], [1]] })
    @_filter(['hallId', 'hallName', 'hallAdress', 'hallCategory', 'hallDescription', 'hallPrice', 'hallLocationLong', 'hallLocationLat', 'hallSpecialOffers', 'hallPhoneNumber', 'hallImage'])
    async updateHall(allRequestParams) {

        let query = { _id: allRequestParams.hallId }
        delete allRequestParams.hallId

        let findCategoryObj = {
            _id: allRequestParams.hallCategory
        }
        if (allRequestParams.hallCategory) {
            let category = await CategoryControllers.findCategory(findCategoryObj)
            if (!category)
                throw new Error('category doesnt exist')
        }

        let updateDataParams = {
            modelRef: this.modelRef,
            query: query,
            data: allRequestParams
        }

        let result = await this.hallsModel.updateData(updateDataParams);
        return result
    }

    @_applyValidators({ 'required': ['hallsAverageRating'] })
    async updateAvgRating(allRequestParams, ratingCounter) {

        let data = ratingCounter ? { hallsAverageRating: allRequestParams.hallsAverageRating, hallsRatingCounter: ratingCounter } : { hallsAverageRating: allRequestParams.hallsAverageRating }
        let updateDataParams = {
            modelRef: this.modelRef,
            query: { _id: allRequestParams._id },
            data: data
        }

        let result = await this.hallsModel.updateData(updateDataParams);
        return result

    }
}

module.exports = new HallsController()
