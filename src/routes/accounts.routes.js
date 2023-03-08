import express from 'express'
import {
	signIn,
	signUp,
	createAccount,
	getUserById,
	updateUserById,
	deleteUserById,
	aboutme,
} from '../controllers/user.controller.js'
import { authenticate as auth } from '../middlewares/authentication.js'

const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)

router.post('/', auth, createAccount)
router.get('/', auth, getUserById)
router.delete('/:id', auth, deleteUserById)
router.put('/:id', auth, updateUserById)


router.get('/aboutme', auth, aboutme)

export default router
