const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const PolicyAndPrivacyController = require('../controllers/PolicyAndPrivacyController');
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');



router.post('/addPolicyAndPrivacy', async (req, res, next) => {

    try {
        let policyAndPrivacy = await PolicyAndPrivacyController.addPolicyAndPrivacy({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ result: true, data: policyAndPrivacy });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
});

router.post('/getPolicyAndPrivacy', async (req, res, next) => {

    try {
        let policyAndPrivacy = await PolicyAndPrivacyController.getPolicyAndPrivacy({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ result: true, data: policyAndPrivacy });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
});

module.exports = router;