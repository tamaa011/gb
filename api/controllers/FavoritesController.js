const FavoritesModelObject = require("../classes/Models/FavoritesModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");


class FavoritesController {

    constructor() {
        this.favoritesModel = new FavoritesModelObject()
        this.modelRef = this.favoritesModel.modelRef
    }

    @_applyValidators({ 'required': ['hallId'] })
    async addToFavorites(allRequestParams) {

        let favoriteObj = {
            hallId: allRequestParams.hallId,
            userId: allRequestParams.userId
        }
        let createDataObj = {
            modelRef: this.modelRef,
            data: favoriteObj
        }

        let data = await this.favoritesModel.createData(createDataObj)
        return data
    }


    @_applyValidators({ 'required': ['hallId'] })
    async deleteFromFavorites(allRequestParams) {

        let favoriteObj = {
            hallId: allRequestParams.hallId,
            userId: allRequestParams.userId
        }
        let deleteDataObj = {
            modelRef: this.modelRef,
            query: favoriteObj
        }

        let isExistObj = {
            modelRef: this.modelRef,
            query: favoriteObj
        }

        let favorite = await this.favoritesModel.isExist(isExistObj)

        if (!favorite)
            throw new Error("hall doesnt exist in favorite")

        if (favorite)
            await this.favoritesModel.deleteData(deleteDataObj)
    }

    async listFavorites(allRequestParams) {

        let getDataWithQueryPaginationAndJoinObj = {
            modelRef: this.modelRef,
            limit: allRequestParams.limit,
            offset: allRequestParams.offset,
            query: { userId: allRequestParams.userId },
            modelToJoinRef: "hallId",
            nestedModelToJoinPath: "hallCategory",
            nestedModelToJoinRef: "Category"
        }

        let userFavorites = await this.favoritesModel.getDataWithQueryPaginationAndJoin(getDataWithQueryPaginationAndJoinObj);
        return userFavorites

    }

}

module.exports = new FavoritesController()
