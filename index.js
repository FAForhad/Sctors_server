const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c3txqlb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const sectorCollections = client.db('DataSectors').collection('sectors')
        const storedSector = client.db('DataSectors').collection('StoredSector')


        app.get('/sectors', async (req, res) => {
            const query = {}
            const result = await sectorCollections.find(query).toArray()
            res.send(result)
        })

        app.post('/storeSector', async (req, res) => {
            const query = req.body
            const result = await storedSector.insertOne(query)
            res.send(result)
        })

        app.get('/allSectors', async (req, res) => {
            const query = {}
            const result = await storedSector.find(query).toArray()
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(console.log())

app.get('/', (req, res) => {
    res.send('DataSectors Are Running')
})

app.listen(port, () => {
    console.log(`server is running at ${port}`)
})