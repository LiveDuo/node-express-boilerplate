// import express from 'express'
const express = require('express')

const { logger } = require('./morgan')
const { bodyParser } = require('./bodyParser')
const { config } = require('../../config/config')

const app = express()

app.use(logger)
app.use(bodyParser)

// console.log("hello")
const listen = () => app.listen(config.defaultPort, () => console.log(`Example app listening on port ${config.defaultPort}!`))

module.exports = { listen }