import { verifyToken } from '../../services/authentication/verifyToken'
import { createUser } from '../../controllers/users/createUser'
import { loginUser } from '../../controllers/users/loginUser'
import { getUser } from '../../controllers/users/getUser'
import { deleteUser } from '../../controllers/users/deleteUser'
import { updateUser } from '../../controllers/users/updateUser'

import { multer } from '../../services/http/multer'

import express from 'express'

const router = express.Router()

router.get('/:userId', getUser)
router.post('/login', loginUser)
router.post('/update', verifyToken, multer.single('image'), updateUser)
router.put('/create', createUser)
router.delete('/delete', verifyToken, deleteUser)

export { router }