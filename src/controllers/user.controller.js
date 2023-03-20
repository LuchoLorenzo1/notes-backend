import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
	} catch (error) {
		return res.status(400).json(Object.values(error.errors)[0].message)
	}

	const token = jwt.sign({ id: user._id }, process.env.SECRET, {
		expiresIn: 60 * 60 * 24 * 30,
	})

	res.status(200).json({ token, username: user.username, email: user.email })
}

export const signIn = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.sendStatus(400)
	}

	const user = await User.findOne({ email })
	if (!user) {
		return res.status(400).json("wrong credentials")
	}

	const validPass = await user.comparePassword(password, user.password)
	if (!validPass) {
		return res.status(400).json("wrong credentials")
	}

	const token = jwt.sign({ id: user._id }, process.env.SECRET, {
		expiresIn: 60 * 60 * 24 * 30,
	})

	res.status(200).json({ token, username: user.username, email: user.email })
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

export const followUserById = async (req, res) => {
	const followId = req.params.id
	const userToFollow = await User.findById(followId)

	console.log('userToFollow', userToFollow)

	if (!userToFollow) {
		return res.sendStatus(404)
	}

	if (userToFollow.followers.includes(req.user.id)) {
		return res.status(400).json("You already follow that User")
	}

	const user = await User.findById(req.user.id)

	userToFollow.followers.push(req.user.id)
	user.following.push(followId)

	console.log(userToFollow.followers)
	console.log(user.following)

	await userToFollow.save()
	await user.save()

	res.sendStatus(200)
}


export const unFollowUserById = async (req, res) => {
	const unfollowId = req.params.id

	const userToUnfollow = User.findById(unfollowId)
	if (!userToUnfollow) {
		return res.sendStatus(404)
	}

	console.log(userToUnfollow)
	if (!userToUnfollow.followers.includes(req.user.id)) {
		return res.status(400).json("You don't  follow that User")
	}

	const user = await User.findById(req.user.id)

	userToUnfollow.followers.remove(req.user.id)
	user.following.remove(unfollowId)

	await userToUnfollow.save()
	await user.save()

	res.sendStatus(200)
}

export const getFeed = async (req, res) => {
	req.json("FEED")
}

export const aboutme = async (req, res) => {
	const e = await User.findById(req.user.id)
	res.json(e)
	// return res.json(req.user)
}
