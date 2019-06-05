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
        let insertDataObj = {
            modelRef: this.modelRef,
            data: [favoriteObj]
        }

       await this.favoritesModel.insertData(insertDataObj)
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

    async listFavorites(allRequestParams){

        let getDataWithQueryObj = {
            modelRef : this.modelRef,
            query :{userId : allRequestParams.userId},
            modelToJoinRef : "hallId"
        }

        let userFavorites = await this.favoritesModel.getDataWithQueryAndJoin(getDataWithQueryObj);
        return userFavorites
        
    }

}

module.exports = new FavoritesController()
