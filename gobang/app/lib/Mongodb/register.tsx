import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://jerryngai223:20030223@cluster0.nvtdjc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export default async function registerUser(username: string, password: string) {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url);
        const db = client.db('text');

        // Get the users collection
        const usersCollection = db.collection('usersnamepw');

        // Create a new user document
        const newUser = {
            username,
            password,
        };

        // Insert the new user document into the collection
        await usersCollection.insertOne(newUser);

        // Close the MongoDB connection
        client.close();

        console.log('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

