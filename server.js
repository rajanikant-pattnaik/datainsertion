import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
import fs from 'fs';
import DataModel from './model.js';


const mongoURI =process.env.MONGO_URL
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI).then(() => console.log('db connected'));
const data = JSON.parse(fs.readFileSync('./jsondata.json', 'utf-8'));

// console.log(data);
const importData = async () => {
    try {
      await DataModel.create(data)
      console.log('data successfully imported')
      process.exit()
    } catch (error) {
      console.log('error', error)
    }
  }
//   importData();

app.get('/', (req, res) => {
  res.send({
    title: 'hello world',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening to port ${PORT}`));