
class RequiredValidator {

    validate(ObjToValidate, fieldsToValidate) {

        let arrayOfErrors = [];
        let errorObj = {}

        for (let index = 0; index < fieldsToValidate.length; index++) {

            if (!this.hasValue(ObjToValidate[fieldsToValidate[index]])) {
                errorObj['field'] = fieldsToValidate[index];
                errorObj['message'] = `${fieldsToValidate[index]} is required`;
                arrayOfErrors.push(JSON.parse(JSON.stringify(errorObj)))
            }
        }

        return arrayOfErrors
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

module.exports = new RequiredValidator()

