const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');
const thirdParty = require('../../config/initThirdParty')



router.post('/pushNotification', checkAuth, permissions, async (req, res, next) => {

    try {

        let pushNotificationObj = {
            title: req.body.title,
            body: req.body.body,
        }
        let ref = thirdParty.ref('PushNotificationsNode');
        ref.push(pushNotificationObj)

        return res.status(200).send({ result: true, message: "notification was sent successfully", data: { title: pushNotificationObj.title, body: pushNotificationObj.body }})
    } catch (error) {
        console.log(error);
        return res.status(400).send({ result: false, message: error.message });
    }



});


module.exports = router;