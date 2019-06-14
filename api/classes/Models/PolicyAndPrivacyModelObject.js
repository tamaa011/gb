const BaseModel = require("./BaseModel");
const policyAndPrivacy = require('../../models/policyAndPrivacy');

class PolicyAndPrivacyModelObject extends BaseModel {

    constructor() {
        super();
        this.modelRef = policyAndPrivacy

    }

}
module.exports = PolicyAndPrivacyModelObject