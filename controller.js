
const fs = require('fs')

const { promisify  } = require('util')

const removeImage =  promisify(fs.unlink)

const  { searchImage, awsUploadImage } = require('./upload-aws');

const ControllerImage = async (req, res, next) => {
    try {
        const data = await searchImage(req.file.path)
        const base64Data = new Buffer(data, 'binary');
        const response = await awsUploadImage(base64Data, req.file.originalname)
        await removeImage(req.file.path)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err)
    } 
}

module.exports = { ControllerImage }