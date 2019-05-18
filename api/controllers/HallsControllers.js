const HallsModelObject = require("../classes/Models/HallsModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");

class HallsController {

    constructor() {
        this.hallsModel = new HallsModelObject()
        this.modelRef = this.hallsModel.modelRef
    }

    async hallsListing(allRequestParams) {

        try {

            let getDataWithPaginationAndJoinAndSortParams = {
                limit: allRequestParams.limit,
                offset: allRequestParams.offset,
                modelRef: this.modelRef,
                sortField: "hallsAverageRating",
                sortOrder: -1,
                modelToJoinRef: "hallCategory"
            }
            let hallsArray = await this.hallsModel.getDataWithPaginationAndJoinAndSort(getDataWithPaginationAndJoinAndSortParams);
            return hallsArray

        } catch (error) {

            throw error
        }
    }

    @_applyValidators({ 'required': ['hallName'] })
    async searchByName(allRequestParams) {

        try {
            let searchByNameParams = {
                limit: allRequestParams.limit,
                offset: allRequestParams.offset,
                fieldValue: allRequestParams.hallName,
                fieldName: "hallName",
                modelRef: this.modelRef,
                modelToJoinRef: "hallCategory"
            }

            let hallsArray = await this.hallsModel.searchDataWithFieldAndJoin(searchByNameParams);

            if (!hallsArray || !hallsArray.length)
                throw new Error("hall with this name not found")

            return hallsArray
        } catch (error) {
            throw error
        }

    }


    @_applyValidators({ 'required': ['hallCategory'] })
    async searchByCategory(allRequestParams) {

        try {
            let searchByNameParams = {
                limit: allRequestParams.limit,
                offset: allRequestParams.offset,
                fieldValue: allRequestParams.hallCategory,
                fieldName: "hallCategory",
                modelRef: this.modelRef,
                modelToJoinRef: "hallCategory"
            }

            let hallsArray = await this.hallsModel.searchDataWithFieldAndJoin(searchByNameParams);

            if (!hallsArray || !hallsArray.length)
                throw new Error("hall with this category not found")

            return hallsArray
        } catch (error) {
            throw error
        }
    }

    async updateHall(allRequestParams) {

    }

    @_applyValidators({ 'required': ['hallsAverageRating'] })
    async updateAvgRating(allRequestParams) {

        let updateDataParams = {
            modelRef: this.modelRef,
            query: { hallId: allRequestParams.hallId },
            data: { hallsAverageRating: allRequestParams.hallsAverageRating }
        }

        let result = await this.hallsModel.updateData(updateDataParams);
        return result

    }
}

module.exports = new HallsController()
