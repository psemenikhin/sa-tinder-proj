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

        res.status(201).json({ token, userId: generatedUserId })
    } catch (err) {
        console.log(err)
    }
})

app.post('/login', async (req, res) => {

    const client = new MongoClient(url)
    const {email, password} = req.body

    try {
        await client.connect()
        const database = client.db('sa-tinder-data')
        const users = database.collection('users')

        const user = await users.findOne({email})

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: '24h'
            })
            res.status(201).json({ token, userId: user.user_id })
        } else {
            res.status(400).send('Invalid credentials')
        }
    } catch(err) {
        console.log(err)
    }
})

app.get('/user', async (req, res) => {
    const client = new MongoClient(url)
    const userId = req.query.userId

    console.log('userId' + userId)

    try {
        await client.connect()
        const database = client.db('sa-tinder-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
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

app.put('/user', async (req, res) => {
    const client = new MongoClient(url)
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('sa-tinder-data')
        const users = database.collection('users')

        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                age: formData.age,
                gender: formData.gender,
                show_gender: formData.show_gender,
                gender_interest: formData.gender_interest,
                url: formData.url,
                bio: formData.bio,
                fav_prof: formData.fav_prof,
            },
        }
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})







app.listen(PORT, () => console.log("Server running on port " + PORT))