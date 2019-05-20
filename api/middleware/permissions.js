
const routeActions = require('../models/routeActions')
const user = require('../models/user')
const BaseModel = require('../classes/Models/BaseModel')

module.exports = async (req, res, next) => {

  let userId = req.userData._id;

  let userAndRoles = await baseModel.getDataWithQueryAndJoin({
    modelRef: user,
    modelToJoinRef: "userRole",
    query: { _id: userId }
  })

  let userActions = userAndRoles[0] ? userAndRoles[0].userRole.actions : []

  let reqPath = req.path;
  let baseModel = new BaseModel()
  let routeAction = await baseModel.getDataWithQuery({
    modelRef: routeActions,
    query: { route: reqPath },
  })

  let action = routeAction[0];

  if (userActions.indexOf(action) > -1)
    return next()

  return res.staus(403).send({ success: false, error: "you dont have permission do perform this action" });

};