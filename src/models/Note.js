import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	fileName: { type: String, required: true },
	isPublic: {type: Boolean, required: true},
	authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
	length: Number,
	content: { type: String, required: true },
})

export default mongoose.model('Note', noteSchema)
