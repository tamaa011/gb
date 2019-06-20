
const UsersModelObject = require("../classes/Models/UsersModelObject");
const _applyValidators = require("../classes/Decorators/applyValidators");
const _filter = require("../classes/Decorators/filterObject");
const config = require("../../config/config.json")
const mail = require("../../api/classes/services/MailServices")
const EncryptService = require("../../api/classes/services/EncryptService")


class UsersController {

    constructor() {
        this.userModel = new UsersModelObject()
        this.modelRef = this.userModel.modelRef
    }

    @_applyValidators({
        'required': ['userPassword', 'rePassword', 'newPassword'],
        'match': ['newPassword', 'rePassword'],
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

    @_applyValidators({ 'required': ['email'], 'email': ['email'], })
    async forgetPassword(allRequsetParams) {

        let email = allRequsetParams.email
        let user = await this.userModel.getDataWithQuery({
            modelRef: this.modelRef,
            query: { userEmail: email }
        })

        user = user[0]

        if (!user)
            throw new Error('wrong email')

        let token = `${user._id}~${new Date().getTime()}`
        let forgetPasswordLink = `${config.forgetPasswordPage}?token=${token}`

        let forgetPasswordEmailObj = {
            to: email,
            subject: 'reset password',
            html: `<p> to reset your password click <a href=${forgetPasswordLink}>here</a></p>`
        }
        mail.sendMail(forgetPasswordEmailObj)

        await this.userModel.updateData({
            modelRef: this.modelRef,
            query: { userEmail: email },
            data: { forgetPassToken: token }
        })
    }

    @_applyValidators({ 'required': ['token'] })
    async validateToken(allRequsetParams) {

        let token = allRequsetParams.token
        let tokenArray = token.split('~')
        let userId = tokenArray[0]

        let user = await this.userModel.getDataWithQuery({
            modelRef: this.modelRef,
            query: { _id: userId }
        })

        user = user[0]

        if (!user || (user && user.forgetPassToken !== token))
            throw new Error('invalid token link')

        let createdTokenTime = tokenArray[1];
        let currentTime = new Date().getTime()
        let timeDiff = (currentTime - createdTokenTime) / 1000 / 60

        if (timeDiff > config.forgetPassTokenExpiryDuration)
            throw new Error('expired token link')
    }


    @_applyValidators({
        'required': ['password', 'rePassword', 'token'],
        'minLength': [['password', 'rePassword'], [6, 6]],
        'maxLength': [['password', 'rePassword'], [15, 15]],
        'match': ['password', 'rePassword']
    })
    async setPassword(allRequsetParams) {

        let token = allRequsetParams.token
        let tokenArray = token.split('~')
        let userId = tokenArray[0]

        let user = await this.userModel.getDataWithQuery({
            modelRef: this.modelRef,
            query: { _id: userId }
        })

        user = user[0]

        if (!user || (user && user.forgetPassToken !== token))
            throw new Error('invalid token link')

        user.userPassword = allRequsetParams.password;
        user.forgetPassToken = null
        await user.save()
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
        let updateData = await this.userModel.updateData(updateDataObj)
        return updateData
    }

    async deleteAdmin(allRequsetParams) {

        let deleteDataObj = {
            modelRef: this.modelRef,
            query: { _id: allRequsetParams._id }
        }
        let removed = await this.userModel.deleteData(deleteDataObj)
        return removed
    }
}

module.exports = new UsersController()
