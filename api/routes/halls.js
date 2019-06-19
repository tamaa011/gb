const express = require("express");
const router = express.Router();
const hall = require('../models/hall');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');

const HallsController = require('../controllers/HallsController');
const MailServices = require('../classes/services/MailServices');
const upload = require('../classes/services/uploader')

router.post('/', checkAuth, permissions, upload.array('hallImage', 6), (req, res, next) => {
    result = []; // insert new hall into ddatabase with images limited to 6
    for (var i = 0; i < req.files.length; i++) {
        result[i] = req.files[i].location // this was path .. changed to file name for ignoring 'uploads' in url
    }

    const newHall = new hall({
        _id: new mongoose.Types.ObjectId(),
        hallName: req.body.hallName,
        hallAdress: req.body.hallAdress,
        hallCategory: req.body.hallCategory,
        hallDescription: req.body.hallDescription,
        hallPrice: req.body.hallPrice,
        hallLocationLong: req.body.hallLocationLong,
        hallLocationLat: req.body.hallLocationLat,
        hallSpecialOffers: req.body.hallSpecialOffers,
        hallPhoneNumber: req.body.hallPhoneNumber,
        hallImage: result
    });
    newHall.save().then(result => {
        res.status(200).json({
            message: 'Hall Saved Successfully',
            data: newHall,
            result: true
        });
    }).catch(error => {
        res.status(500).json({ message: error.message, result: true });
    });
});


router.post('/listHalls', async (req, res, next) => {
    try {
        let hallsArray = await HallsController.hallsListing({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "Halls Loaded Successfully", data: hallsArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});

router.post('/searchByName', async (req, res, next) => {

    try {
        let hallsArray = await HallsController.searchByName({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "Halls Loaded Successfully", data: hallsArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
})

router.post('/searchByCategory', async (req, res, next) => {

    try {
        let hallsArray = await HallsController.searchByCategory({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "Halls Loaded Successfully", data: hallsArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
})


router.post('/update', checkAuth, permissions, async (req, res, next) => {

    try {
        let hallsArray = await HallsController.updateHall({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "Hall Updated Successfully", data: hallsArray });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });
    }
})

router.get('/:HallID', (req, res, next) => { // get hall info by id
    const id = req.params.HallID;
    hall.findById(id).select("_id hallName hallAdress hallCategory hallImage hallDescription hallPrice hallLocationLong hallLocationLat hallSpecialOffers hallPhoneNumber").exec().then(doc => {
        console.log("from databse ", doc);
        if (doc) {
            res.status(200).json({ data: doc, result: true, message: "Hall Updated Successfully", });
        } else {
            res.status(404).json({ message: 'Not valid hall id', result: false });
        }

    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});



router.delete('/:HallID', (req, res, next) => { // delete hall by id
    const id = req.params.HallID;

    hall.findById(id).exec().then(doc => {  // get hall data from database by id
        if (doc) { // if hall data exsist
            hall.deleteOne({ _id: id }).exec().then(result => { // delete hall data from database

                for (var i = 0; i < doc.hallImage.length; i++) { // loop on hall images 
                    fs.unlink('./uploads/' + doc.hallImage[i], (error) => { // delete each image from uploads folder

                    });
                } // loop end

                return res.status(200).json({
                    message: 'hall deleted with its images resultfully',
                    result: true,
                    data: id
                });

            }).catch(error => {
                console.log(error);
                res.status(404).json({ message: error.message, result: false });
            });
        } else {
            return res.status(404).json({ message: 'Not found', result: false });
        }
    }).catch(error => {
        res.status(500).json({ message: error, result: false });
    });
});

module.exports = router;