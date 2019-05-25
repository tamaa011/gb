
const express = require("express");
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/UserController');

// sign up user 
//------------------------------------------------------------------------------------------
router.post('/signup', (req, res, next) => { // sign up new user and check if exist first
    User.find({ userEmail: req.body.userEmail }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                error: 'Mail exists'
            });
        } else {

            bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        userName: req.body.userName,
                        userEmail: req.body.userEmail,
                        userPassword: hash
                    });
                    user.save().then(reuslt => {
                        res.status(200).json({
                            message: 'User sign up successfully',
                            user: user
                        });
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({ error: error });
                    });
                }
            });

        }
    });

});


// sign in user 
//------------------------------------------------------------------------------------------
router.post('/signin', (req, res, next) => {
    User.find({ userEmail: req.body.userEmail }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                error: 'Auth failed'
            });
        }

        bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {

            if (err) {
                return res.status(401).json({
                    error: 'Auth failed'
                });
            }

            if (result) {
                const token = jwt.sign(
                    {
                        userEmail: user[0].userEmail,
                        userId: user[0]._id
                    },
                    'tamaaGamedAwe',
                    {
                        expiresIn: "1h"
                    });

                return res.status(200).json({
                    message: 'Auth successfull',
                    user: user,
                    token: token
                });
            }

            res.status(401).json({
                error: 'Auth failed'
            });

        });

    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });

});




// get request
//------------------------------------------------------------------------------------------
router.get('/', async (req, res, next) => { // get all users we have on database

    User.find().select("_id userName userEmail userPassword").populate("userRole")
        .exec().then(allUsers => {
            if (allUsers.length >= 0) {
                res.status(200).json(allUsers);
            } else {
                res.status(404).json({ error: 'No Users found' });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });
});


router.post('/updatePassword', checkAuth, async (req, res, next) => {
    try {

        await UsersController.updatePassword({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ success: true, message: "user password updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: JSON.parse(error.message) });

    }
});


router.post('/updateBasicInfo', checkAuth, async (req, res, next) => {
    try {

        await UsersController.updateBasicInfo({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ success: true, message: "user Name updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: JSON.parse(error.message) });

    }
});

router.post('/addUser', checkAuth, async (req, res, next) => {
    try {

        let user = await UsersController.addUser({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ success: true, message: "user added successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: (error.message) });

    }
});

router.get('/:userID', checkAuth, (req, res, next) => { // get specific user information by user id
    const id = req.params.userID;
    User.findById(id).select("_id userName userEmail userPassword").exec().then(user => {
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: 'Not valid user id' });
        }

    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

// delete request
//--------------------------------------------------------------------------------------------------
router.delete('/:userID', (req, res, nect) => {  // delete user from database by id
    const id = req.params.userID;
    User.remove({ _id: id }).exec().then(result => {
        res.status(200).json({
            message: 'User Deleted'
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error });
    });
});

module.exports = router;