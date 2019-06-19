const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../../../config/config.json')

aws.config.update({
    secretAccessKey: config.awsSecretAccessKey,
    accessKeyId: config.awsAccessKeyId,
    region: 'us-east-1'
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: config.bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload