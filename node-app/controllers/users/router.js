import { verifyToken } from '../../services/authentication/verifyToken'
import { createUser } from '../../controllers/users/createUser'
import { loginUser } from '../../controllers/users/loginUser'
import { getUser } from '../../controllers/users/getUser'
import { deleteUser } from '../../controllers/users/deleteUser'

import express from 'express'

const router = express.Router()

router.get('/:userId', getUser)
router.post('/login', loginUser)
router.post('/create', createUser)
router.post('/delete', verifyToken, deleteUser)

export { router }