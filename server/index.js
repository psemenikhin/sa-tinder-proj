const PORT = 8000

const express = require('express')
const {MongoClient} = require('mongodb')
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const uri = process.env.URI

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb', parameterLimit: 5000000}));

// Default
app.get('/', (req, res) =>
{
res.json('Hello to my app')
})

app.post('/signup', async (req, res) =>
{
const client = new MongoClient(uri)
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

    res.status(201).json({token, userId: generatedUserId})
} catch (err) {
    console.log(err)
}
})

app.post('/login', async (req, res) =>
{

const client = new MongoClient(uri)
const {email, password} = req.body

try {
    await client.connect()
    const database = client.db('sa-tinder-data')
    const users = database.collection('users')

    const user = await users.
    find({ email: email })
        .limit(1)
        .project({user_id: 1, email: 1, hashed_password: 1, _id: 0})

    console.log(user)

    const correctPassword = await bcrypt.compare(password, user.hashed_password)

    if (user && correctPassword) {
        const token = jwt.sign(user, password, {expiresIn: '24h'})
        res.status(201).json({user, userId: user.user_id})
        console.log(res.status)
    } else {
        res.status(400).send('Invalid credentials')
    }
} catch (err) {
    console.log(err)
}
})

app.get('/user', async (req, res) =>
{
const client = new MongoClient(uri)
const userId = req.query.userId

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

app.get('/users', async (req, res) =>
{
const client = new MongoClient(uri)
const userIds = JSON.parse(req.query.userIds)
try {
    await client.connect()
    const database = client.db('sa-tinder-data')
    const users = database.collection('users')

    const pipeline =
        [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds
                    }
                }
            }
        ]

    const foundUsers = await users.aggregate(pipeline).toArray()
    res.json(foundUsers)

} finally {
    await client.close()
}
})

app.get('/gendered-users', async (req, res) =>
{
const client = new MongoClient(uri)
const gender_int = req.query.gender

try {
    await client.connect()
    const database = client.db('sa-tinder-data')
    const users = database.collection('users')
    let query = {}
    if (gender_int !== 'both') {
        query = {gender: {$eq: gender_int}}
    }
    const foundUsers = await users.find(query).toArray()

    res.send(foundUsers)
} catch (err) {
    console.log(err)
} finally {
    await client.close()
}
})

app.put('/user', async (req, res) =>
{
    const client = new MongoClient(uri)
    const formData = req.body

try {
    await client.connect()
    const database = client.db('sa-tinder-data')
    const users = database.collection('users')

    const query = {user_id: formData.user_id}
    const updateDocument = {
        $set: {
            first_name: formData.first_name,
            age: formData.age,
            gender: formData.gender,
            show_gender: formData.show_gender,
            gender_interest: formData.gender_interest,
            bio: formData.bio,
            fav_prof: formData.fav_prof,
            matches: formData.matches,
            url: formData.profile_picture_link
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


app.put('/add-match', async (req, res) =>
{
const client = new MongoClient(uri)
const {userId, matchedUserId} = req.body

try {
    await client.connect()
    const database = client.db('sa-tinder-data')
    const users = database.collection('users')

    const query = {user_id: userId}
    const updateDocument = {
        $push: {matches: {user_id: matchedUserId}}
    }
    const user = await users.updateOne(query, updateDocument)
    res.send(user)
} finally {
    await client.close()
}
})

app.get('/messages', async (req, res) =>
{
const client = new MongoClient(uri)
const {userId, correspondingUserId} = req.query
try {
    await client.connect()
    const database = client.db('sa-tinder-data')
    const messages = database.collection('messages')

    const query = {
        from_userId: userId, to_userId: correspondingUserId
    }
    const foundMessages = await messages.find(query).toArray()
    res.send(foundMessages)
} finally {
    await client.close()
}

})

app.post('/message', async (req, res) => {
const client = new MongoClient(uri)
const message = req.body.message

try {
    await client.connect()
    const database = client.db('sa-tinder-data')
    const messages = database.collection('messages')

    const insertedMessage = await messages.insertOne(message)
    res.send(insertedMessage)
} finally {
    await client.close()
}
})


app.listen(PORT, () => console.log("Server running on port " + PORT))