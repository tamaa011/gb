const FavoritesModelObject = require("../classes/Models/FavoritesModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");


class FavoritesController {

    constructor() {
        this.favoritesModel = new FavoritesModelObject()
        this.modelRef = this.favoritesModel.modelRef
    }

    @_applyValidators({ 'required': ['hallId', 'userId'] })
    async addToFavorites(allRequestParams) {

        let favoriteObj = {
            hallId: allRequestParams.hallId,
            userId: allRequestParams.userId
        }
        let insertDataObj = {
            modelRef: this.modelRef,
            data: [favoriteObj]
        }

        let isExistObj = {
            modelRef: this.modelRef,
            query: favoriteObj
        }

        let favorite = await this.favoritesModel.isExist(isExistObj)

        if (favorite)
            throw new Error("hall is already favorite")

        if (!favorite)
            var favorites = await this.favoritesModel.insertData(insertDataObj)

        return favorites
    }


    @_applyValidators({ 'required': ['hallId', 'userId'] })
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
            var favorites = await this.favoritesModel.deleteData(deleteDataObj)

        return favorites
    }

}

module.exports = new FavoritesController()
