const express = require("express");
const router = express.Router();
const FeedbackController = require('../controllers/FeedbackController');
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');


router.post('/listFeedback', checkAuth, permissions, async (req, res, next) => {
    try {
        let feedbackArray = await FeedbackController.feedbackListing({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, data: feedbackArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});

router.post('/addFeedback', async (req, res, next) => {
    try {
        let feedbackArray = await FeedbackController.addFeedback({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, data: feedbackArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});

module.exports = router;