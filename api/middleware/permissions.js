const routeActions = require('../models/routeActions')
const BaseModel = require('../classes/Models/BaseModel')

module.exports = async (req, res, next) => {

  let user = req.userData;
  let userRole = user.userRole;
  let userActions = userRole.actions

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