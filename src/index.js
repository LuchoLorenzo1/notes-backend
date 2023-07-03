import './config.js'
import express from 'express'
import cors from 'cors'
import notes from './routes/notes.routes.js'
import accounts from './routes/accounts.routes.js'

const app = express()

import './databaseConnection.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => {
	res.redirect('/accounts/signin')
})

app.use('/notes', notes)
app.use('/accounts', accounts)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`server running on ${PORT}`)
})
