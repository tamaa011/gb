
const express = require("express");
var app = express();

const router = express.Router();
const User = require('../models/user');
const rolesActions = require('../models/rolesActions');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const permissions = require('../middleware/permissions');
const UsersController = require('../controllers/UserController');

// sign up user 
//------------------------------------------------------------------------------------------
router.post('/signup', (req, res, next) => { // sign up new user and check if exist first
    User.find({ userEmail: req.body.userEmail }).exec().then(async user => {
        if (user.length >= 1) {
            return res.status(409).json({
                error: 'Mail exists'
            });
        } else {

            let userRole = await rolesActions.findOne({ role: 'user' })

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
                        userPassword: req.body.userPassword,
                        isAdmin: false,
                        userRole: userRole._id
                    });


                    const token = jwt.sign(
                        {
                            userEmail: req.body.userEmail,
                            userId: user._id
                        },
                        'tamaaGamedAwe',
                        {
                            expiresIn: "1h"
                        });

                    user.save().then(reuslt => {
                        res.status(200).json({
                            result: true,
                            message: 'User sign up successfully',
                            user: { ...user, ...{ token: token } },
                        });

                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({ result: false, message: error.message });
                    });
                }
            });

        }
    });

});


// sign in user 
//------------------------------------------------------------------------------------------
router.post('/signin', (req, res, next) => {
    User.find({ userEmail: req.body.userEmail }).populate('userRole').exec().then(user => {
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
                    user: { ...user, ...{ token: token } },
                });
            }

            res.status(401).json({
                error: 'Auth failed'
            });

        });

    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
    });

});




// get request
//------------------------------------------------------------------------------------------
router.post('/', checkAuth, permissions, async (req, res, next) => { // get all users we have on database

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

router.post('/listSystemUsers', checkAuth, permissions, async (req, res, next) => { // get all users we have on database

    let limit = req.body.limit;
    let skip = req.body.limit * req.body.offset
    User.find({ isAdmin: true }).select("_id userName userEmail userPassword").populate("userRole").skip(skip).limit(limit)
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

router.post('/updatePassword', checkAuth, permissions, async (req, res, next) => {
    try {

        await UsersController.updatePassword({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ result: true, message: "user password updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: JSON.parse(error.message) });

    }
});


router.post('/forgetPassword', async (req, res, next) => {
    try {

        await UsersController.forgetPassword({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "email has sent to you to reset your password" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
});

router.post('/verifyToken', async (req, res, next) => {

    try {
        await UsersController.validateToken({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "valid token link" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
})

router.post('/setPassword', async (req, res, next) => {

    try {
        await UsersController.setPassword({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "user password updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
})


router.post('/updateBasicInfo', checkAuth, permissions, async (req, res, next) => {
    try {

        await UsersController.updateBasicInfo({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ result: true, message: "user Name updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: JSON.parse(error.message) });

    }
});

router.post('/updateRole', checkAuth, permissions, async (req, res, next) => {
    try {

        await UsersController.updateUserRole({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ result: true, message: "user Role updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: JSON.parse(error.message) });

    }
});

router.post('/addUser', checkAuth, permissions, async (req, res, next) => {
    try {

        let user = await UsersController.addUser({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "user added resultfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
});

router.post('/deleteAdmin', checkAuth, permissions, async (req, res, next) => {
    try {

        await UsersController.deleteAdmin({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, message: "user deleted resultfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

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
        res.status(500).json({ message: error });
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
        res.status(500).json({ message: error });
    });
});

module.exports = router;