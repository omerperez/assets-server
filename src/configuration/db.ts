import mongoose from "mongoose";
import { config } from "dotenv";

config();
const { MONGO_CONNECTION, MONGO_HOST } = process.env;
const mongoConnectionUrl = `${MONGO_CONNECTION}@${MONGO_HOST}retryWrites=true&w=majority`;
mongoose.connect(mongoConnectionUrl).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.log('Error connecting to MongoDB Atlas:', error);
});

const { connection: db } = mongoose;

export { db };