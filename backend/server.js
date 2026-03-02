const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const url = process.env.mongodb_uri;
const client = new MongoClient(url);
var cors = require('cors')


const app = express()
const port = 3000
client.connect();


app.use(cors())
app.use(bodyParser.json());


//to get all the passwords
app.get('/', async (req, res) => {
    const db = client.db('password_manager');
    const collection = db.collection('passwords');
    const findres = await collection.find({}).toArray();
    res.json(findres);
});

//to insert a password
app.post('/', async (req, res) => {
    try {
        let password = req.body
        const db = client.db('password_manager');
        const collection = db.collection('passwords');
        const insertres = await collection.insertOne(password);
        res.json(insertres);
    } catch (error) {
        console.error('Error inserting password:', error);
        res.status(500).json({ error: error.message });
    }
});

// to delete a password
app.delete('/', async (req, res) => {
    try {
        let password = req.body
        const db = client.db('password_manager');
        const collection = db.collection('passwords');
        const { ObjectId } = require('mongodb');
        const deleteres = await collection.deleteOne({ _id: new ObjectId(password._id) });
        res.json(deleteres);
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({ error: error.message });
    }
})

// to update a password

app.put('/', async (req, res) => {
    try {
        let password = req.body
        const db = client.db('password_manager');
        const collection = db.collection('passwords');
        const { ObjectId } = require('mongodb');
        const _id = password._id;
        delete password._id;
        const updatereq = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: password });
        res.json(updatereq);
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

