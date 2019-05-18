
class MinLengthValidator {

    validate(ObjToValidate, fieldsToValidate) {

        let fields = fieldsToValidate[0];
        let minValues = fieldsToValidate[1]
        let arrayOfErrors = [];
        let errorObj = {}

        for (let index = 0; index < fields.length; index++) {
            if (ObjToValidate[fields[index]] && ObjToValidate[fields[index]].length < minValues[index]) {
                errorObj['field'] = fields[index];
                errorObj['message'] = `${fields[index]} min length is ${minValues[index]}`;
                arrayOfErrors.push(JSON.parse(JSON.stringify(errorObj)));
            }
        }

        return arrayOfErrors

    }

}

module.exports = new MinLengthValidator()

