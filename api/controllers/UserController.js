const UsersModelObject = require("../classes/Models/UsersModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");
const EncryptService = require("../classes/services/EncryptService");


class UsersController {

    constructor() {
        this.userModel = new UsersModelObject()
        this.modelRef = this.userModel.modelRef
    }

    @_applyValidators({
        'required': ['userPassword', 'rePassword', 'newPassword'],
        'match': ['userPassword', 'rePassword'],
        'minLength': [['newPassword'], [6]],
        'maxLength': [['newPassword'], [15]]
    })
    async updatePassword(allRequsetParams) {

        let getDataWithQueryObj = {
            modelRef: this.modelRef,
            query: { _id: allRequsetParams.userId },
            data: { userPassword: allRequsetParams.newPassword }
        }
        let user = await this.userModel.getDataWithQuery(getDataWithQueryObj);
        user = user[0]
        
        if (!user)
            throw new Error(JSON.stringify({ message: "user doesnt exist" }))

        let isMatched = await EncryptService.compareHashWithPlain(user.userPassword, allRequsetParams.userPassword)
        if (isMatched) {
            user.userPassword = allRequsetParams.newPassword
            await user.save()
        }
        if (!isMatched)
            throw new Error(JSON.stringify([{ field: "userPassword", message: "wrong Password" }]))

        
    }

}

module.exports = new UsersController()
