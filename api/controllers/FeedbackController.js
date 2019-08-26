const FeedbackModelObject = require("../classes/Models/FeedbackModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");
const _filter = require("../classes/Decorators/filterObject");


class FeedbackController {

    constructor() {
        this.feedbackModel = new FeedbackModelObject()
        this.modelRef = this.feedbackModel.modelRef
    }

    @_applyValidators({
        'required': ['email', 'text'],
        'email': ['email'],

    })
    @_filter(['email', 'text'])
    async addFeedback(allRequestParams) {

        let feedbackArray = await this.feedbackModel.insertData({
            modelRef: this.modelRef,
            data: { ...allRequestParams, date: new Date() }
        })

        return feedbackArray
    }


    async feedbackListing(allRequestParams) {

        let getDataWithPagination = {
            limit: allRequestParams.limit,
            offset: allRequestParams.offset,
            modelRef: this.modelRef,
        }
        let feedbackArray = await this.feedbackModel.getDataWithPagination(getDataWithPagination);
        return feedbackArray
    }
}

module.exports = new FeedbackController()
