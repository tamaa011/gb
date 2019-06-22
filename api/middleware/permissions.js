
const routeActions = require('../models/routeActions')
const user = require('../models/user')
const BaseModel = require('../classes/Models/BaseModel')

module.exports = async (req, res, next) => {

  try {
    let userId = req.userData.userId;
    let baseModel = new BaseModel()

    let userAndRoles = await baseModel.getDataWithQueryAndJoin({
      modelRef: user,
      normalJson: true,
      modelToJoinRef: "userRole",
      query: { _id: userId }
    })

    let userActions = userAndRoles[0] ? userAndRoles[0].userRole.actions : []
    userActions = userActions[0]
    let reqPath = `${req.baseUrl}${req.path}`;

    let routeAction = await baseModel.getDataWithQuery({
      modelRef: routeActions,
      query: { route: reqPath },
    })

    let action = routeAction[0];

    let arrayOfKeys = Object.keys(userActions)
    for (let key of arrayOfKeys) {
      let ArrayOfActions = userActions[key]
      if (Array.isArray(ArrayOfActions) && ArrayOfActions.indexOf(action.actions) > -1)
        return next()
    }

    return res.send({ result: false, message: "you dont have permission do perform this action" });

  } catch (error) {
    console.log(error);
    return res.send({ result: false, message: error.message });

  }

};