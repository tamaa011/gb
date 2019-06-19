const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const RatingControllers = require('../controllers/RatingController');
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');



router.post('/rateHalls', checkAuth, permissions, async (req, res, next) => {

    try {
        let raring = await RatingControllers.rateHall({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ result: true, message: "you rated the hall successfully", data: raring });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
});


module.exports = router;