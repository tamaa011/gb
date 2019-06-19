const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const FavoritesController = require('../controllers/FavoritesController');
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');



router.post('/addToFavorites', checkAuth, permissions, async (req, res, next) => {

    try {
        let data = await FavoritesController.addToFavorites({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ result: true, data: data, message: "favorites added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
});


router.post('/deleteFromFavorites', checkAuth, permissions, async (req, res, next) => {

    try {
        await FavoritesController.deleteFromFavorites({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ result: true, data: req.body.hallId, message: "favorites deleted resultfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
});


router.post('/listFavorites', checkAuth, async (req, res, next) => {

    try {
        let userFavorites = await FavoritesController.listFavorites({ ...req.body, ...req.headers, ...req.query, ...req.params, ...req.userData })
        return res.status(200).json({ result: true, message: "favorites loaded succesfully", data: userFavorites });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
});

module.exports = router;