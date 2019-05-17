const BaseDecorators = require("./BaseDecorators");
const RequiredValidator = require("../../classes/Validators/RequiredValidator")


Validators = {
    'required': RequiredValidator,
}

class applyValidator extends BaseDecorators {

    decoratorAction(targetMethodParams, decoratorParams) {

        let validatorObj = targetMethodParams[0]
        let arrayOfValidationErrors = []
        Object.keys(decoratorParams).forEach(key => {
            let returnedArrayOfValidationErrors = Validators[key].validate(validatorObj, decoratorParams[key])
            arrayOfValidationErrors.push(...returnedArrayOfValidationErrors)
        })

        if (arrayOfValidationErrors.length)
            throw new Error(JSON.stringify(arrayOfValidationErrors))


    }
}

module.exports = (params) => new applyValidator().decorator(params)

