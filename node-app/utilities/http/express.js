// import express from 'express'
import express from 'express'

import { logger } from './morgan'
import { bodyParser } from './bodyParser'
import { config } from '../../config/config'

const app = express()

app.use(logger)
app.use(bodyParser)

// console.log("hello")
const listen = () => app.listen(config.defaultPort, () => console.log(`Express listening on port ${config.defaultPort}!`))

export { listen }