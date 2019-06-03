
const routeActions = require('../models/routeActions')
const user = require('../models/user')
const BaseModel = require('../classes/Models/BaseModel')

module.exports = async (req, res, next) => {

  let userId = req.userData.userId;
  let baseModel = new BaseModel()

  let userAndRoles = await baseModel.getDataWithQueryAndJoin({
    modelRef: user,
    modelToJoinRef: "userRole",
    query: { _id: userId }
  })

  let userActions = userAndRoles[0] ? userAndRoles[0].userRole.actions : []

  let reqPath = `${req.baseUrl}${req.path}`;
  let routeAction = await baseModel.getDataWithQuery({
    modelRef: routeActions,
    query: { route: reqPath },
  })

  let action = routeAction[0];

  for (let index = 0; index < userActions.length; index++)
    if (userActions[index].name === action.actions)
      return next()

  return res.send({ success: false, error: "you dont have permission do perform this action" });

};