const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const FavoritesController = require('../controllers/FavoritesControllers');
const checkAuth = require('../middleware/check-auth');



router.post('/addToFavorites', checkAuth, async (req, res, next) => {

    try {
        let favorites = await FavoritesController.addToFavorites({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ success: true, data: favorites });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
});


router.post('/deleteFromFavorites', checkAuth, async (req, res, next) => {

    try {
        let favorites = await FavoritesController.deleteFromFavorites({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ success: true, data: favorites });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;