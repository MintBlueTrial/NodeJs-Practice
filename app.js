const express = require('express')
const router = require('./router')

const app = express()

app.use('/', router)

const server = app.listen(5000, '127.0.0.1', function() {
    const {address, port} = server.address()
    console.log('Http Server is running on http://%s:%s', address, port)
})
