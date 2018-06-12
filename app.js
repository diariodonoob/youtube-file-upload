const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { Upload, Base64InArchive } = require('./upload')

const app = express()

app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(express.static(path.join(__dirname, 'upload')))


app.post('/upload', Upload.single('avatar'), (req, res) => res.status(200).json(req.file))

app.post('/base64', Base64InArchive, (req, res) => res.status(200).json({msg: true}))

const port = process.env.PORT || 8080

app.listen(port, () => console.log('Estou no diario do noob'))