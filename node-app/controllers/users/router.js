import { verifyToken } from '../../services/authentication/verify'
import { createUser } from '../../controllers/users/createUser'
import { deleteUser } from '../../controllers/users/deleteUser'

import express from 'express'

const router = express.Router()

router.post('/create', createUser)
router.post('/delete', verifyToken, deleteUser)

export { router }