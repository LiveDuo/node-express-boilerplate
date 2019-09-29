import 'dotenv/config'

import { configure } from './utilities/locale/i18n'
import { connect } from './utilities/databases/mongoose'

configure()

connect()
