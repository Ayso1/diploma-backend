var axios = require('axios')
var binary = require('binary')
var fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
var crypto = require('crypto-js')
var AWS = require('aws-sdk')
var { PutObjectCommand } = require('aws-sdk/clients/s3')
var path = require('path')

const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const region = process.env.AWS_BUCKET_REGION
const bucketName = process.env.AWS_BUCKET_NAME

// Create S3 service object
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

async function uploadPhoto(file) {
  var currentdate = new Date()
  var datetime =
    currentdate.getFullYear() +
    '+' +
    (currentdate.getMonth() + 1) +
    '+' +
    currentdate.getDate() +
    '@' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds()
  //const fileStream = fs.createReadStream(file)
  const uploadParams = {
    Bucket: bucketName,
    // Add the required 'Key' parameter using the 'path' module.
    Key: datetime,
    // Add the required 'Body' parameter
    Body: file,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  }
  return s3.upload(uploadParams).promise()
}

async function deletePhoto(filename) {
  const deleteParams = {
    Bucket: bucketName,
    Key: filename
  }
  const deletePhoto = s3.deleteObject(deleteParams, function (err, data) {
    if (err) console.log(err, err.stack) // an error occurred
    // successful response
  })
  return deletePhoto
}

async function getPhoto(req, res) {
  try {
    var data = await downloadPhoto('test1.png')
    console.log('Success', data)
    return data // For unit tests.
  } catch (err) {
    console.log('Error', err)
  }
}
module.exports = { getPhoto, uploadPhoto, deletePhoto }
