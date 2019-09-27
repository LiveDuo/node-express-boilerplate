import 'dotenv/config';

import { listen  } from './utilities/http/express'
import { connect } from './utilities/databases/mongo'

connect().then(listen)
