
const UsersModelObject = require("../classes/Models/UsersModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");
const _filter = require("../classes/Decorators/filterObject");


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

    @_applyValidators({
        'required': ['userName'],
        'minLength': [['userName'], [6]],
        'maxLength': [['userName'], [15]]
    })
    async updateBasicInfo(allRequsetParams) {

        let updateDataObj = {
            modelRef: this.modelRef,
            query: { _id: allRequsetParams.userId },
            data: { userName: allRequsetParams.userName }
        }

        await this.userModel.updateData(updateDataObj);

    }

    @_applyValidators({
        'required': ['userPassword', 'userEmail', 'userName', 'userRole'],
        'email': ['userEmail'],
        'minLength': [['userPassword', 'userName'], [6, 6]],
        'maxLength': [['userPassword', 'userName'], [15, 15]]
    })
    @_filter(['userPassword', 'userEmail', 'userName', 'userRole'])
    async addUser(allRequsetParams) {
        
        let insertDataObj = {
            modelRef: this.modelRef,
            data: { ...allRequsetParams, isAdmin: true }
        }
        let user = await this.userModel.createData(insertDataObj)        
        return user
    }

    @_applyValidators({ 'required': ['userRole'] })
    @_filter(['userRole', 'userId'])
    async updateUserRole(allRequsetParams) {

        let updateDataObj = {
            modelRef: this.modelRef,
            query: { _id: allRequsetParams.userId },
            data: { userRole: allRequsetParams.userRole }
        }
        await this.userModel.updateData(updateDataObj)
    }
}

module.exports = new UsersController()
