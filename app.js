const express = require('express')
const bodyParser = require('body-parser')
const { Upload } = require('./upload')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload', Upload.single('avatar'), (req, res) => res.status(200).json(req.file))

const port = process.env.PORT || 8080

app.listen(port, () => console.log('Estou no diario do noob'))



