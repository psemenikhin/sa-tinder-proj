const PORT = 8000

const express = require('express')
const {MongoClient} = require('mongodb')
const url = 'mongodb+srv://itcomchief:IM21aDRbi2eCzftV@cluster69.qfrzzih.mongodb.net/?retryWrites=true&w=majority'
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("Hello there!")
})

app.post('/signup', async(req, res) =>
{
    const client = new MongoClient(url)
    const {email, password} = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('sa-tinder-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})

        if (existingUser) {
            return res.status(409).send('User already exists, please log in')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword,
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {expiresIn: '24h'})

        res.status(201).json({token, userId: generatedUserId, email: sanitizedEmail})
    } catch (err) {
        console.log(err)
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(url)

    try {
        await client.connect()
        const database = client.db('sa-tinder-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    }   finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log("Server running on port " + PORT))