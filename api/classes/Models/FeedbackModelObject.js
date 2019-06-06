const BaseModel = require("./BaseModel");
const feedback = require('../../models/feedback');

class FeedbackModelObject extends BaseModel {

    constructor() {
        super();
        this.modelRef = feedback
    }

}
module.exports = FeedbackModelObject