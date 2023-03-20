import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'You must provide a username'],
			unique: true,
			minlength: [3, 'Your username must have at least 3 characters'],
			maxlength: [20, 'Your username cannot have more than 20 characters'],
			// This is checked everytime you `user.save`, so it doesn't work, because it's called when you update too.
			// validate: {
			// 	validator: async function(username) {
			// 		return !(await this.constructor.exists({ username }))
			// 	},
			// 	message: _ => 'This username is already registered',
			// }
		},
		email: {
			type: String,
			required: [true, 'You must provide an email'],
			unique: true,
			lowercase: true,
			// validate: {
			// 	validator: async function(email) {
			// 		return !(await this.constructor.exists({ email }))
			// 	},
			// 	message: _ => 'This email is already registered',
			// }
		},
		password: {
			type: String,
			required: [true, 'You must provide a password'],
		},
		followers: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		}],
		following: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		}],
		createdAt: {
			type: Date,
			default: () => Date.now(),
			inmmutable: true,
			required: true,
		},
		updatedAt: {
			type: Date,
			required: true,
			default: () => Date.now(),
		},
	},
);


userSchema.pre('save', function(next) {
	this.updatedAt = Date.now()
	next()
})

userSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword)
}

export default mongoose.model("User", userSchema);
