import mongoose from "mongoose"

const noteSchema = new mongoose.Schema(
	{
		fileName: {
			type: String,
			required: true,
		},
		isPublic: {
			type: Boolean,
			required: true,
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			immutable: true,
		},
		length: {
			type: Number,
			min: 0,
			max: 10000,
		},
		content: { type: String, required: true },
		date: {
			type: Date,
			default: () => Date.now(),
			required: true,
			inmmutable: true,
		},
		updatedAt: {
			type: Date,
			required: true,
			default: () => Date.now(),
		}
	}
)

noteSchema.pre('save', function(next) {
	this.updatedAt = Date.now()
	next()
})

export default mongoose.model('Note', noteSchema)
