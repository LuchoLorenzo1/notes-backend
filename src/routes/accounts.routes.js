import express from 'express'
import { signIn, signUp } from '../controllers/account.controller.js'

import {
	createAccount,
	getUserById,
	updateUserById,
	deleteUserById,
} from '../controllers/user.controller.js'
import { authenticate as auth } from '../middlewares/authentication.js'

const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)

router.post('/', auth, createAccount)
router.get('/', auth, getUserById)
// router.delete('/:id', auth, deleteUserById)
router.delete('/', auth, deleteUserById)
router.put('/:id', auth, updateUserById)

export default router
