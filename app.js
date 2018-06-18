const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { Upload, Base64InArchive } = require('./upload')

const { ControllerImage  }  = require('./controller')

const app = express()

app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))
app.use(express.static(path.join(__dirname, 'upload')))


app.post('/upload', Upload.single('avatar'), ControllerImage)

app.post('/base64', Base64InArchive, ControllerImage)


const port = process.env.PORT || 8080

app.listen(port, () => console.log('Estou no diario do noob'))