const Aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const config = path.join(__dirname, './config-aws.json');

Aws.config.loadFromPath(config);

const s3 = new Aws.S3();

/**
 * Ele recebe o nome da imagem em string
 * @param  { String } image
 */

const searchImage = (image) => readFile(image)

/**
 * Sobe o arquivo para aws com base nome e na imagem atribuida
 * @param  {Buffer } image
 * @param  { String } key
 */
const awsUploadImage = (image, key) => s3.upload({
    Bucket: "higordiego",
    Body: image,
    Key: key,
    ACL: 'public-read',
    ContentEncoding: 'base64'
}).promise()

const removeImageAws = key => s3.deleteObjects({
    Bucket: "higordiego",
    Delete: { Objects: [{Key: key}] }
}).promise()

module.exports = { awsUploadImage, searchImage, removeImageAws }


