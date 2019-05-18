const BaseDecorators = require("./BaseDecorators");
const RequiredValidator = require("../../classes/Validators/RequiredValidator")
const MaxValidator = require("../../classes/Validators/MaxValidator")
const MinValidator = require("../../classes/Validators/MinValidator")


Validators = {
    'required': RequiredValidator,
    'min': MinValidator,
    'max': MaxValidator
}

class applyValidator extends BaseDecorators {

    decoratorAction(targetMethodParams, decoratorParams) {

        let validatorObj = targetMethodParams[0]
        let arrayOfValidationErrors = []
        Object.keys(decoratorParams).forEach(key => {
            let returnedArrayOfValidationErrors = Validators[key].validate(validatorObj, decoratorParams[key])
            if (returnedArrayOfValidationErrors.length)
                arrayOfValidationErrors.push(...returnedArrayOfValidationErrors)
        })

        if (arrayOfValidationErrors.length)
            throw new Error(JSON.stringify(arrayOfValidationErrors))


    }
}

module.exports = (params) => new applyValidator().decorator(params)

