// import express from 'express'
import express from 'express'

import { logger } from './morgan'
import { parser, json } from './bodyParser'
import { locale } from '../locale/i18n'
import { config } from '../../config/config'

import { notFound } from '../../controllers/errors/notFound'

const app = express()

app.use(logger)
app.use(locale)
app.use(parser)
app.use(json)

app.use(notFound)

export { listen }