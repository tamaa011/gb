
class EmailValidator {


    validate(ObjToValidate, fieldsToValidate) {

        let arrayOfErrors = [];
        let errorObj = {};
        let result;
        let isEmail;

        for (let index = 0; index < fieldsToValidate.length; index++) {
            result = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
            isEmail = result.test(ObjToValidate[fieldsToValidate[index]])
            if (!isEmail) {
                errorObj['field'] = fieldsToValidate[0];
                errorObj['message'] = `${fieldsToValidate[0]} must be email}`;
                arrayOfErrors.push(JSON.parse(JSON.stringify(errorObj)));
            }
        }

        return arrayOfErrors;
    }

}

module.exports = new EmailValidator()

