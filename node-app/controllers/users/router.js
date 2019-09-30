import { verifyToken } from '../../services/authentication/verifyToken'
import { createUser } from '../../controllers/users/createUser'
import { getUser } from '../../controllers/users/getUser'
import { deleteUser } from '../../controllers/users/deleteUser'

import express from 'express'

const router = express.Router()

router.get('/:userId', getUser)
router.post('/create', createUser)
router.post('/delete', verifyToken, deleteUser)

export { router }