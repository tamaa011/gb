const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');

const CategoryController = require('../controllers/CategoryController');


router.post('/listCategories', async (req, res, next) => {
    try {
        let categoriesArray = await CategoryController.listCategories({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "categories loaded successfully", data: categoriesArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});

router.post('/addCategory', checkAuth, permissions, async (req, res, next) => {
    try {
        let categoriesArray = await CategoryController.addCategory({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "category added successfully", data: categoriesArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});

module.exports = router;