
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RolesController = require('../controllers/RolesController');

router.post('/listRoles', checkAuth, async (req, res, next) => {

    try {
        let rolesArray = await RolesController.listRoles({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ success: true, data: rolesArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });

    }
})

module.exports = router;