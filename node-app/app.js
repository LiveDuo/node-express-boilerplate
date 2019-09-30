import 'dotenv/config'

import { listen  } from './services/http/express'
import { connect } from './services/databases/mongoose'
import { configure } from './services/locale/i18n'

configure()

connect().then(listen)
