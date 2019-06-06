const express = require("express");
const router = express.Router();
const FeedbackController = require('../controllers/FeedbackController');


router.post('/listFeedback', async (req, res, next) => {
    try {
        let feedbackArray = await FeedbackController.feedbackListing({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ success: true, data: feedbackArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });

    }
});

router.post('/addFeedback', async (req, res, next) => {
    try {
        let feedbackArray = await FeedbackController.addFeedback({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ success: true, data: feedbackArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });

    }
});

module.exports = router;