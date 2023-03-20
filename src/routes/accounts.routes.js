import express from 'express'
import {
	signIn,
	signUp,
	getUserById,
	updateUserById,
	deleteUserById,
	followUserById,
	unFollowUserById,
	getFeed,
	aboutme,
} from '../controllers/user.controller.js'
import { authenticate as auth } from '../middlewares/authentication.js'

const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)

router.get('/', auth, getUserById)
router.delete('/:id', auth, deleteUserById)
router.put('/:id', auth, updateUserById)

router.put('/follow/:id', auth, followUserById)
router.put('/unfollow/:id', auth, unFollowUserById)

router.post('/feed', auth, getFeed)

router.get('/aboutme', auth, aboutme)

export default router
