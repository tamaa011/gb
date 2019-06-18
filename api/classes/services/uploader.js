const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const config = require('../../../config/config.json')

aws.config.update({
    secretAccessKey: "y8i+fOAwwPiSBn0P9aVYW+TjSkRL6ZAj5EukB7Wy",//config.secretAccessKey,
    accessKeyId: "AKIAJNYE5YANIELXWJHA", //config.accessKeyId,
    region: 'us-east-2'
})
const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "groomandbride",//config.bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload