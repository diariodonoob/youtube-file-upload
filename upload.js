const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)

const image = promisify(crypto.pseudoRandomBytes)


const storage = multer.diskStorage({
    destination: 'upload',
    filename: async (req, file, cb) => {
        const raw = await image(16)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
    }
})

const Upload = multer({ storage: storage })

const Base64InArchive = async (req, res, next) => {
    let avatar = req.body.avatar.split(';base64,').pop();
    await writeFile('upload/diariodonoob.png', avatar, {encoding: 'base64'})
    req.file = { path: 'upload/diariodonoob.png', originalname: 'diariodonoob.png' }
    next()
}

module.exports = { Upload, Base64InArchive }