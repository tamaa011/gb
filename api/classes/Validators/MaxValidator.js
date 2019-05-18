
class MaxValidator {

    validate(ObjToValidate, fieldsToValidate) {

        let fields = fieldsToValidate[0];
        let maxValues = fieldsToValidate[1]
        let arrayOfErrors = [];
        let errorObj = {}

        for (let index = 0; index < fields.length; index++) {
            if (ObjToValidate[fields[index]] > maxValues[index]) {
                errorObj['field'] = fields[index];
                errorObj['message'] = `${fields[index]} max value is ${maxValues[index]}`;
                arrayOfErrors.push(JSON.parse(JSON.stringify(errorObj)));
            }
        }

        return arrayOfErrors
      
    }

}

module.exports = new MaxValidator()

