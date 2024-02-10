import express, { Express, Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './route/auth';

// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

// MongoDB connection URL
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PASS}@cluster0-8gblk.mongodb.net/${process.env.MONGO_DB}`;

// Connect to MongoDB with options
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any) // Explicitly assert the options object to any
  .then(() => {
    console.log('----------------------------------Mongo Connection Success--------------------------------');
    console.log('listening on port: ', port);
    app.listen(process.env.PORT || port);
  })
  .catch((err: any) => {
    console.log('----------------------------------Mongo Connection Error--------------------------------');
    console.log('process.env.MONGO_USER : ', process.env.MONGO_USER);
    console.log('process.env.MONGO_USER_PASS : ', process.env.MONGO_USER_PASS);
    console.log('process.env.MONGO_USER_PASS : ', process.env.MONGO_DB);
    console.log(err);
  });

// Routes
app.use('/api/auth', authRoutes);

// Define your routes and middleware here...

export default app; // Export your app if needed for testing or integration purposes
