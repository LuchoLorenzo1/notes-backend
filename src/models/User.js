import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
		password: {
			type: String,
		},
		providerId: {
			type: String,
		},
		provider: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

userSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async (password, receivedPassword) => {
	return await bcrypt.compare(password, receivedPassword)
}

export default mongoose.model("User", userSchema);
