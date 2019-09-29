// import express from 'express'
import express from 'express'

import { logger } from './morgan'
import { parser, json } from './bodyParser'
import { bodyParser } from './bodyParser'
import { config } from '../../config/config'

const app = express()

app.use(logger)
app.use(parser)
app.use(json)

// console.log("hello")
const listen = () => app.listen(config.defaultPort, () => console.log(`Express listening on port ${config.defaultPort}!`))

export { listen }