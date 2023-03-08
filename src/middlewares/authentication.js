import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
	const auth = req.headers['authorization']
	if(!auth || !auth.toUpperCase().includes('BEARER')){
		return res.status(400).json("No token provided")
	}
	const token = auth.substr(7) // Authorization:Bearer token

	try {
		const data = jwt.verify(token, process.env.SECRET)
		const user = await User.findById(data.id)
		console.log(user)
		req.user = {username: user.username, id: user._id, email: user.email}
	} catch (error) {
		return res.status(400).json("Invalid token")
	}
	next()
}
