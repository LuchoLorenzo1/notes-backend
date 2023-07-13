import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const validateUserData = async (user) => {
	const u = await User.find({ email: user.email })
	return {
		isValid: !(u && u.length > 0),
		message: 'This email is already registered',
		status: 409,
	}
}

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET, {
		expiresIn: "3h",
	})
}

export const signUp = async (req, res) => {
	const { username, password, email } = req.body

	const v = await validateUserData(req.body)
	if (!v.isValid) {
		return res.status(v.status).json(v.message)
	}

	const user = new User({
		username,
		password,
		email,
	})

	user.password = await user.encryptPassword(password)
	await user.save()

	const token = createToken(user._id);

	res.status(200).json({ token, username: user.username, email: user.email })
}

export const signIn = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.sendStatus(400)
	}

	const user = await User.findOne({ email })
	if (!user) {
		return res.status(400).send('wrong credentials')
	}

	const verification = await user.comparePassword(password, user.password)
	if (!verification) {
		return res.status(400).send('wrong credentials')
	}

	const token = jwt.sign({ id: user._id }, process.env.SECRET, {
		expiresIn: "3h",
	})

	res.status(200).json({ token, username: user.username, email: user.email })
}

export const getAccountProvider = async (req, res) => {
	const { username, providerId, email, provider } = req.body
	if (!username || !providerId || !email || !provider)
		return res.sendStatus(400)

	const user = await User.find({ providerId: providerId, provider: provider })
	if (user) {
		const token = createToken(user._id);
		return res.status(200).json({ token })
	}

	const newUser = new User({
		username,
		email,
		providerId,
		provider,
	})

	await newUser.save()
	const token = createToken(newUser._id);
	res.status(200).json({ token })
}

export const deleteUserById = async (req, res) => {
	try {
		await User.deleteUserById(req.user.id)
	} catch (err) {
		console.log(err)
		return res.sendStatus(400)
	}
	res.sendStatus(200)
}

export const getUserById = async (req, res) => {
	const user = await User.findById(req.user.id)
	res.json(user)
}

export const updateUserById = async (req, res) => {
	const updatedNote = await Note.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	)
	res.status(204).json(updatedNote)
}

export const aboutme = async (req, res) => {
	res.json({ user: req.user.username, email: req.user.email })
}
