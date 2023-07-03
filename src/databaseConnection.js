import mongoose from 'mongoose'

mongoose
	.connect(process.env.MONGODB_URI, {})
	.then((db) => {
		console.log("Database connected", db.connection.name)
	})
	.catch((error) => {
		console.log(error)
	})

process.on('uncaughtException', (error) => {
	console.error(error)
	mongoose.disconnect()
})
