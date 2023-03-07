import express from 'express'
import {
	createNote,
	getNotes,
	getNoteById,
	updateNoteById,
	deleteNoteById,
} from '../controllers/notes.controller.js'
import { authenticate as auth } from '../middlewares/authentication.js'

const router = express.Router()

router.post('/', auth, createNote)
router.get('/', auth, getNotes)
router.get('/:id', auth, getNoteById)
router.delete('/:id', auth, deleteNoteById)
router.put('/:id', auth, updateNoteById)

export default router
