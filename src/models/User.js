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
			required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
		followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
		following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
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
