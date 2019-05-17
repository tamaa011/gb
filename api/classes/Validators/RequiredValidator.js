
class RequiredValidator {

    validate(ObjToValidate, fieldsToValidate) {

        let arrayOfErrors = [];
        let errorObj = {}

        for (let index = 0; index < fieldsToValidate.length; index++) {
            if (!ObjToValidate[fieldsToValidate[index]] || !ObjToValidate[fieldsToValidate[index]].length) {
                errorObj['field'] = fieldsToValidate[index];
                errorObj['message'] = `${fieldsToValidate[index]} is required`;
                arrayOfErrors.push(JSON.parse(JSON.stringify(errorObj)))
            }
        }

        return arrayOfErrors
    }

}

module.exports = new RequiredValidator()

