const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const { promisify } = require('util')

const image = promisify(crypto.pseudoRandomBytes)


const storage = multer.diskStorage({
    destination: 'upload',
    filename: async (req, file, cb) => {
        const raw = await image(16)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
    }
})

var Upload = multer({ storage: storage })

module.exports = { Upload }