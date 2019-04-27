const express = require("express");
const router = express.Router();
const hall = require('../models/hall');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const checkAuth = require('../middleware/check-auth');

// uploading images..
//--------------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null , true);
    }else{
        cb(Error('image is not valid'), false);
    }
};
const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 30
},
fileFilter: fileFilter
});

var result = new Array()
router.post('/', upload.array('hallImage', 6), (req, res, next) => { // insert new hall into ddatabase with images limited to 6
    for(var i = 0; i < req.files.length; i++){
        result[i] = req.files[i].filename // this was path .. changed to file name for ignoring 'uploads' in url
    } 

    const newHall = new hall({
        _id: new mongoose.Types.ObjectId(),
        hallName: req.body.hallName,
        hallAdress: req.body.hallAdress,
        hallCategory: req.body.hallCategory,
        hallImage: result
    });
    newHall.save().then(result => {
        res.status(200).json({
            message: 'Hall Saved Successfully',
            hall: newHall
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });
});


// get request
//------------------------------------------------------------------------------------------
router.get('/', (req, res, next) => { // get all halls
    hall.find().select("_id hallName hallAdress hallCategory hallImage")
    .exec().then(allHalls => {
        console.log(allHalls);
        if (allHalls.length >= 0){
            res.status(200).json(allHalls);
        }else {
            res.status(404).json({message: 'No halls found'});
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });
});

router.get('/:HallID', (req, res, next) => { // get hall info by id
    const id = req.params.HallID;
    hall.findById(id).select("_id hallName hallAdress hallCategory hallImage").exec().then(doc => {
        console.log("from databse ",doc);
        if (doc){
           res.status(200).json({ doc });
        }else {
            res.status(404).json({message: 'Not valid hall id'});
        }

    }).catch(error => {
        console.log(error);
        res.status(500).json({error: error});
    });
});


// delete request
//--------------------------------------------------------------------------------------------------
router.delete('/:HallID', (req, res, next) => { // delete hall by id
    const id = req.params.HallID;
 
    hall.findById(id).exec().then(doc => {  // get hall data from database by id
             if (doc){ // if hall data exsist
                 hall.deleteOne({ _id: id }).exec().then(result => { // delete hall data from database
 
                     for(var i = 0; i < doc.hallImage.length; i++){ // loop on hall images 
                         fs.unlink('./uploads/'+doc.hallImage[i], (error) =>{ // delete each image from uploads folder
          
                         });
                     } // loop end
                     
                     return res.status(200).json({
                         message: 'hall deleted with its images successfully'
                     });
 
                 }).catch(error => {
                     console.log(error);
                     res.status(404).json({error: error});
                 });  
             }else {
               return res.status(404).json({message: 'Not found'});
             }
     }).catch(error => {
         console.log(error);
         res.status(500).json({error: error});
     });
 });



module.exports = router;