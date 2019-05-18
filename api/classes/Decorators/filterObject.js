const BaseDecorators = require("./BaseDecorators");

class filterObject extends BaseDecorators {

    decoratorAction(targetMethodParams, decoratorParams) {

        let objToFilter = targetMethodParams[0]
        let arrayOfFilteredKeys = decoratorParams
        let filteredObj = {};

        Object.keys(objToFilter).forEach(key => {
            if (this.hasValue(objToFilter[key]) && arrayOfFilteredKeys.indexOf(key) > -1) {
                filteredObj[key] = objToFilter[key]
            }
        })

        targetMethodParams[0] = filteredObj
    }

    hasValue(field) {

        if (typeof field == "number" && (field || field == 0))
            return true

        if (typeof field == "string" && field.length)
            return true

        if (typeof field == "object" && Object.keys(field).length)
            return true

        return false
    }
}

module.exports = (params) => new filterObject().decorator(params)

