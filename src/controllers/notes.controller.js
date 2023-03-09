import Note from '../models/Note.js'

export const createNote = async (req, res) => {
	const { fileName, content, length } = req.body
	if(!fileName || !content){
		return res.status(400).json("Incorrect note format")
	}

	const isPublic = !!req.body.isPublic // if it's undefined it's false (it's not public)

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
		return res.status(201).json(noteSaved)
	} catch (error) {
		console.error(error)
		return res.sendStatus(500)
	}
}

export const getNotes = async (req, res) => {
	const notes = await Note.find({authorId: req.user.id})
	return res.json(notes)
}


export const getNoteById = async (req, res) => {
	// const note = await Note.findById(req.params.id)
	// if(!note) return res.sendStatus(404).end()
	// if(!note.isPublic && !req.user.id.equals(note.authorId)) return res.sendStatus(404).end()
	res.status(200).json(req.note)
}

export const updateNoteById = async (req, res) => {
	// const note = await Note.findById(req.params.id)
	// if(!note) return res.sendStatus(404).end()
	// if(!note.isPublic && !req.user.id.equals(note.authorId)) return res.sendStatus(404).end()

	await req.note.updateOne(req.body)
	await req.note.save()
	res.sendStatus(200)
}

export const deleteNoteById = async (req, res) => {
	/* await Note.deleteMany({}) */

	// const note = await Note.findById(req.params.id)
	// if(!note) return res.sendStatus(404).end()
	// if(!note.isPublic && !req.user.id.equals(note.authorId)) return res.sendStatus(404).end()

	try {
		await req.note.deleteOne()
		return res.sendStatus(200)
	} catch(err) {
		console.log(err)
		return res.sendStatus(500)
	}
}
