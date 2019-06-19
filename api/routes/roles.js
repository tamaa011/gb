
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions')
const RolesController = require('../controllers/RolesController');

router.post('/listRoles', checkAuth, permissions, async (req, res, next) => {

    try {
        let rolesArray = await RolesController.listRoles({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "roles loaded successfully", data: rolesArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
})

module.exports = router;