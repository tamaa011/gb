const express = require("express");
const router = express.Router();
const FeedbackController = require('../controllers/FeedbackController');
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');
const feedback = require('../models/feedback');


router.post('/listFeedback', checkAuth, permissions, async (req, res, next) => {
    try {
        let feedbackArray = await FeedbackController.feedbackListing({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "feedback loaded successfully", data: feedbackArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});

router.post('/numberOfFeedback', async (req, res, next) => {

    let count = await feedback.count();
    return res.status(200).json({ result: true, message: "Feedback count Loaded Successfully", data: count });

})

router.post('/addFeedback', async (req, res, next) => {
    try {
        let feedbackArray = await FeedbackController.addFeedback({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "feedback added successfully", data: feedbackArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});

module.exports = router;