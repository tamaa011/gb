
const config = require('../../../config/config.json')
const aws = require('aws-sdk')

exports.destroyImage = function (filename, callback) {

    var s3 = new aws.S3();

    var params = {
        Bucket: config.bucketName,
        Key: filename
    };

    s3.deleteObject(params, function (err, data) {
        console.log(params);

        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null);
        }
    });
}
