import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';

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
  // setup express server
  const envAllowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(',') ?? [];
  const allowedOrigins: string[] = [
    'https://localhost:2999',
    'http://localhost:3000',
    'http://192.168.1.249:3000',
    ...envAllowedOrigins
  ];
  const app = express();
  app.use(express.json());
  app.use(cors({
    origin: allowedOrigins
}));

  const port = process.env.PORT ?? 3001;

  app.get('/', (req, res) => {
    res.send('Server is running...');
  });

  app.get('/notes', async (req, res) => {
    const notes = await noteCollection.find({}).sort({timestamp: -1}).toArray();
    res.send(notes);
  });

  app.post('/notes', async (req, res) => {
    try{
        const text = req.body.text;
        const title = req.body.title;
        const timestamp = Date.now();
        const result = await noteCollection.insertOne({
            text: text,
            title: title,
            timestamp: timestamp
        });
        // @ts-ignore
        if(result.insertedId){
          res.send({
            text: text,
            title: title,
            timestamp: timestamp,
            // @ts-ignore
            _id: result.insertedId
          })
        }else{
          res.send(result);
        }
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