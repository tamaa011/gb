
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
                message: 'Mail exists',
                result: false
            });
        } else {

            let userRole = await rolesActions.findOne({ role: 'user' })

            bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: "invalid password",
                        result: false
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
                            user: { ...user._doc, ...{ token: token } },
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
                message: 'wrong email or password',
                result: false
            });
        }

        bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {

            if (err) {
                return res.status(401).json({
                    message: 'wrong email or password',
                    result: false
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
                    result: true,
                    user: { ...user[0]._doc, ...{ token: token } },
                });
            }

            res.status(401).json({
                message: 'Auth failed',
                result: false
            });

        });

    }).catch(error => {
        res.status(500).json({ error: error.message, result: false });
    });

});




// get request
//------------------------------------------------------------------------------------------
router.post('/', checkAuth, permissions, async (req, res, next) => { // get all users we have on database

    let limit = req.body.limit
    let skip = req.body.limit * req.body.offset
    User.find().select("_id userName userEmail userPassword").populate("userRole").skip(skip).limit(limit)
        .exec().then(allUsers => {
            if (allUsers.length >= 0) {
                res.status(200).json({ data: allUsers, message: 'Users Loaded Successfully', result: true });
            } else {
                res.status(404).json({ message: 'No Users found', result: false });
            }
        }).catch(error => {
            res.status(500).json({ message: error.message, result: false });
        });
});

router.post('/listSystemUsers', checkAuth, permissions, async (req, res, next) => { // get all users we have on database

    let limit = req.body.limit;
    let skip = req.body.limit * req.body.offset
    User.find({ isAdmin: true }).select("_id userName userEmail userPassword").populate("userRole").skip(skip).limit(limit)
        .exec().then(allUsers => {
            if (allUsers.length >= 0) {
                res.status(200).json({ data: allUsers, message: 'Users Loaded Successfully', result: true });
            } else {
                res.status(404).json({ message: 'No Users found', result: false });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: error.message, result: false });
        });
});

router.post('/updatePassword', checkAuth, permissions, async (req, res, next) => {
    try {

        await UsersController.updatePassword({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ result: true, message: "user password updated", data: req.user });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: error.message });

    }
});


router.post('/forgetPassword', async (req, res, next) => {
    try {

        await UsersController.forgetPassword({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, data: req.body.email, message: "email has sent to you to reset your password" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
});

router.post('/verifyToken', async (req, res, next) => {

    try {
        await UsersController.validateToken({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, data: req.body.token, message: "valid token link" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
})

router.post('/setPassword', async (req, res, next) => {

    try {
        await UsersController.setPassword({ ...req.body, ...req.headers, ...req.params, ...req.query })
        return res.status(200).json({ result: true, data: req.body.password, message: "user password updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
})


router.post('/updateBasicInfo', checkAuth, permissions, async (req, res, next) => {
    try {

        await UsersController.updateBasicInfo({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ result: true, data: erq.userData, message: "user Name updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
});

router.post('/updateRole', checkAuth, permissions, async (req, res, next) => {
    try {

        await UsersController.updateUserRole({ ...req.body, ...req.headers, ...req.params, ...req.query, ...req.userData })
        return res.status(200).json({ result: true, data: req.userData, message: "user Role updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

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
        return res.status(200).json({ result: true, data: req.body._id, message: "user deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, message: (error.message) });

    }
});

router.get('/:userID', checkAuth, (req, res, next) => { // get specific user information by user id
    const id = req.params.userID;
    User.findById(id).select("_id userName userEmail userPassword").exec().then(user => {
        if (user) {
            res.status(200).json({ result: true, message: "user loaded successfully", data: user });
        } else {
            res.status(404).json({ result: false, message: 'Not valid user id' });
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
            message: 'User Deleted',
            result: true,
            data: id
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: error.message, result: false });
    });
});

module.exports = router;