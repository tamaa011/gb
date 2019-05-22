const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    let token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

    if (!token)
        return res.status(401).send({ success: false, message: " auth failed" })

    jwt.verify(token, 'tamaaGamedAwe', function (err, decoded) {

        if (decoded) {
            req.userData = decoded
            return next()
        }
        if (err) {

            if (err.name == "TokenExpiredError") {
                let data = jwt.decode(token)
                token = jwt.sign(
                    {
                        userEmail: data.userEmail,
                        userId: data.userId
                    },
                    'tamaaGamedAwe',
                    {
                        expiresIn: "1h"
                    });

                return res.status(400).send({ success: false, token: token, refreshToken: true })
            }

            return res.status(401).send({ success: false, message: " auth failed" })

        }

        return res.status(401).send({ success: false, message: " auth failed" })
    });


};