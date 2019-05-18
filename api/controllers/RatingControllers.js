const RatingModelObject = require("../classes/Models/RatingModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");
const HallsControllerObject = require("../controllers/HallsControllers");

class RatingController {

    constructor() {
        this.ratingModel = new RatingModelObject()
        this.modelRef = this.ratingModel.modelRef
    }

    @_applyValidators({ 'required': ['rating', 'hallId', 'userId'], 'min': [['rating'], [1]], 'max': [['rating'], [5]] })
    async rateHall(allRequestParams) {

        let ratingObj = {
            rating: allRequestParams.rating,
            hallId: allRequestParams.hallId,
            userId: allRequestParams.userId
        }
        let insertDataObj = {
            modelRef: this.modelRef,
            data: [ratingObj]
        }

        let replaceDataObj = {
            modelRef: this.modelRef,
            data: ratingObj,
            query: { userId: ratingObj.userId, hallId: ratingObj.hallId }
        }

        let isExistObj = {
            modelRef: this.modelRef,
            query: { userId: ratingObj.userId, hallId: ratingObj.hallId }
        }

        let mathOperationObj = {
            operation: "avg",
            operationField: "rating",
            idField: "hallId",
            idValue: ratingObj.hallId,
            modelRef: this.modelRef
        }

        let rating = await this.ratingModel.isExist(isExistObj)

        if (rating)
            rating = await this.ratingModel.replaceData(replaceDataObj)

        if (!rating)
            rating = await this.ratingModel.insertData(insertDataObj)

        let resultedAverage = await this.ratingModel.mathOperation(mathOperationObj)

        let updatedAverage = await HallsControllerObject.updateAvgRating(resultedAverage[0])

        return updatedAverage

    }

}

module.exports = new RatingController()
