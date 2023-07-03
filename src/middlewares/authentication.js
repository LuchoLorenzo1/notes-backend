import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Note from '../models/Note.js'

export const authenticate = async (req, res, next) => {
	const auth = req.headers['authorization']
	if (!auth || !auth.toUpperCase().includes('BEARER')) {
		return res.status(400).json("No token provided")
	}
	const token = auth.substr(7) // Authorization:Bearer token

	try {
		const data = jwt.verify(token, process.env.SECRET)
		const user = await User.findById(data.id)
		req.user = { username: user.username, id: user._id, email: user.email }
	} catch (error) {
		return res.status(400).json("Invalid token")
	}
	next()
}

export const checkAuthorId = async (req, res, next) => {
	const note = await Note.findById(req.params.id)
	if (!note) return res.sendStatus(404).end()
	if (!note.isPublic && !req.user.id.equals(note.authorId)) return res.sendStatus(404).end()
	req.note = note
	next()
}
