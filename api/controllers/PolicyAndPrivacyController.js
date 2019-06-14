const PolicyAndPrivacyModelObject = require("../classes/Models/PolicyAndPrivacyModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");
const _filter = require("../classes/Decorators/filterObject");


class PolicyAndPrivacyController {

    constructor() {
        this.PolicyAndPrivacyModelObject = new PolicyAndPrivacyModelObject()
        this.modelRef = this.PolicyAndPrivacyModelObject.modelRef
    }

    @_applyValidators({ 'required': ['text', 'type'] })
    @_filter(['text', 'type'])
    async addPolicyAndPrivacy(allRequestParams) {

        let insertDataObj = {
            modelRef: this.modelRef,
            data: allRequestParams
        }

        let getDataWithQueryObj = {
            modelRef: this.modelRef,
            query: { type: allRequestParams.type }
        }

        let replaceDataObj = {
            modelRef: this.modelRef,
            query: { type: allRequestParams.type },
            data: allRequestParams
        }

        let policyAndPrivacy = await this.PolicyAndPrivacyModelObject.getDataWithQuery(getDataWithQueryObj)

        policyAndPrivacy = policyAndPrivacy[0]

        if (policyAndPrivacy)
            policyAndPrivacy = await this.PolicyAndPrivacyModelObject.replaceData(insertDataObj)

        if (!policyAndPrivacy)
            policyAndPrivacy = await this.PolicyAndPrivacyModelObject.insertData(insertDataObj)

        return policyAndPrivacy
    }

    @_applyValidators({ 'required': ['type'] })
    async getPolicyAndPrivacy(allRequestParams) {

        let getDataWithQueryObj = {
            modelRef: this.modelRef,
            query: { type: allRequestParams.type },
        }
        let policyAndPrivacy = await this.PolicyAndPrivacyModelObject.getDataWithQuery(getDataWithQueryObj)
        return policyAndPrivacy
    }
}

module.exports = new PolicyAndPrivacyController()
