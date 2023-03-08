import Note from '../models/Note.js'

export const createNote = async (req, res) => {
	let { fileName, content, isPublic, length } = req.body
	if(!fileName || !content){
		return res.status(400).json("Incorret note format")
	}

	isPublic = !!isPublic // if it's undefined it's false (it's not public)

	try {
		const newNote = new Note({
			date: new Date(),
			authorId: req.user.id,
			fileName,
			content,
			isPublic,
			length,
		})
		const noteSaved = await newNote.save()
		res.status(201).json(noteSaved)
	} catch (error) {
		console.error(error)
		return res.sendStatus(500)
	}
}

export const getNotes = async (req, res) => {
	console.log(req.user.id)
	const notes = await Note.find({authorId: req.user.id})
	return res.json(notes)
}

export const getNoteById = async (req, res) => {
	const note = await Note.find({_id: req.params.id})
	if(!note || (!note.isPublic && note.authorId != req.user.id)){
		return res.sendStatus(404).end()
	}
	res.status(200).json(note)
}

export const updateNoteById = async (req, res) => {
	const updatedNote = await Note.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)
	res.status(204).json(updatedNote)
}

export const deleteNoteById = async (req, res) => {
	await Note.findByIdAndDelete(req.params.id)
	res.status(204).json()
}
