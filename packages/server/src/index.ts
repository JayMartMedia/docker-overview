import { MongoClient } from 'mongodb';
import express from 'express';

// Connection URL
const url = process.env.MONGO_URL ?? 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const noteCollection = db.collection('notes');

  // startup express server
  const app = express();
  app.use(express.json());

  const port = process.env.PORT ?? 3001;

  app.get('/', (req, res) => {
    res.send('Server is running...');
  });

  app.get('/notes', async (req, res) => {
    const notes = await noteCollection.find({}).toArray();
    res.send(notes);
  });

  app.post('/notes', async (req, res) => {
    try{
        const text = req.body.text
        const result = await noteCollection.insertOne({
            text: text,
            timestamp: Date.now()
        });
        res.send(result);
    }catch(e){
        console.error(e);
        res.status(500).send('Failed to insert note');
    }
  });

  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  })
}

main()