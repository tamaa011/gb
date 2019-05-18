
class MatchValidator {

    validate(ObjToValidate, fieldsToValidate) {

        let firstFieldKey = fieldsToValidate[0];
        let secondFieldKey = fieldsToValidate[1]
        let arrayOfErrors = [];
        let errorObj = {}

        if (ObjToValidate[firstFieldKey] != ObjToValidate[secondFieldKey]) {
            errorObj['field'] = firstFieldKey
            errorObj['message'] = `${firstFieldKey} and ${secondFieldKey} doesnt match`
            arrayOfErrors.push(JSON.parse(JSON.stringify(errorObj)));
        }


        return arrayOfErrors

    }

}

module.exports = new MatchValidator()

