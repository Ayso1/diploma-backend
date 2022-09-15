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

const file1 = 'routes/images/uploads/test2.png' // Path to and name of object. For example '../myFiles/index.js'.

async function uploadPhoto(file) {
  const fileStream = fs.createReadStream(file)
  const uploadParams = {
    Bucket: bucketName,
    // Add the required 'Key' parameter using the 'path' module.
    Key: path.basename(file),
    // Add the required 'Body' parameter
    Body: fileStream
  }
  return s3.upload(uploadParams).promise()
}
async function postPhoto(req, res) {
  try {
    var data = await uploadPhoto(file1)
    console.log('Success', data)
    return data // For unit tests.
  } catch (err) {
    console.log('Error', err)
  }
}
async function downloadPhoto(filename) {
  const downloadParams = {
    Key: filename,
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
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
module.exports = { postPhoto, getPhoto }
