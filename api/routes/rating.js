const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const RatingControllers = require('../controllers/RatingControllers');
const checkAuth = require('../middleware/check-auth');



router.post('/rateHalls', checkAuth, async (req, res, next) => {

    try {
        let raring = await RatingControllers.rateHall({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ success: true, data: raring });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
});


module.exports = router;