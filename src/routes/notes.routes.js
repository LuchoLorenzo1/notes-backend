import express from 'express'
import {
	createNote,
	getNotes,
	getNoteById,
	updateNoteById,
	deleteNoteById,
} from '../controllers/notes.controller.js'
import { authenticate as auth, checkAuthorId } from '../middlewares/authentication.js'

const router = express.Router()

router.post('/', auth, createNote)
router.get('/', auth, getNotes)

router.get('/:id', auth, checkAuthorId, getNoteById)
router.delete('/:id', auth, checkAuthorId, deleteNoteById)
router.put('/:id', auth, checkAuthorId, updateNoteById)

export default router
