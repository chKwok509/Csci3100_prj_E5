import { MongoClient } from 'mongodb';
import {v4 as uuidv4} from 'uuid';
import shortid from 'shortid';
const url = 'mongodb+srv://jerryngai223:20030223@cluster0.nvtdjc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export default async function registerUser(username: string, password: string) {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url);
        const db = client.db('text');

        // Get the users collection
        const rankingmark = 0; // Declare and initialize the variable 'rankingmark' with a default value
        const gold = 0; // Declare and initialize the variable 'gold' with a default value
        const longid = uuidv4(); // Declare and initialize the variable 'id' with a unique value
        const sid = shortid.generate(); // Declare and initialize the variable 'id' with a unique value
        const usersCollection = db.collection('usersnamepw');

        // Create a new user document
        const newUser = {
            username,
            password,
            rankingmark,
            gold,
            longid,
            sid
        };

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ username: username });

        if (existingUser) {
            console.log('User already exists!');
            return false;
        }else{
            // Insert the new user document into the collection
            await usersCollection.insertOne(newUser);
            console.log('User registered successfully!');
            return true;
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return false;
    }
}

