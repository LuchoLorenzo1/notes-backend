import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const validateUserData = async (user) => {
	const u = await User.find({ email: user.email })
	return {
		isValid: (u && u.length == 0),
		message: 'This email is already registered',
		status: 409,
	}
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

	const token = jwt.sign({ id: user._id }, process.env.SECRET, {
		expiresIn: 60 * 60, // 1 hora
	})

	res.status(200).json({ token })
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
		expiresIn: 60 * 60,
	})

	res.json({ token })
}
