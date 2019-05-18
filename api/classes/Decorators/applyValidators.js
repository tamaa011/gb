const BaseDecorators = require("./BaseDecorators");
const RequiredValidator = require("../../classes/Validators/RequiredValidator")
const MaxValidator = require("../../classes/Validators/MaxValidator")
const MinValidator = require("../../classes/Validators/MinValidator")
const MinLengthValidator = require("../../classes/Validators/MinLengthValidator")
const MaxLengthValidator = require("../../classes/Validators/MaxLengthValidator")
const MatchValidator = require("../../classes/Validators/MatchValidator")


Validators = {
    'required': RequiredValidator,
    'match': MatchValidator,
    'min': MinValidator,
    'max': MaxValidator,
    'maxLength': MaxLengthValidator,
    'minLength': MinLengthValidator
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

