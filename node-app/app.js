import 'dotenv/config';

import { listen  } from './utilities/http/express'
import { connect } from './utilities/databases/mongoose'
import { configure } from './utilities/locale/i18n'

configure()

connect().then(listen)
