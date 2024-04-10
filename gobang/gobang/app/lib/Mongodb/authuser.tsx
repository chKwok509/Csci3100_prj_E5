import { MongoClient } from 'mongodb';

// Define the MongoDB connection URL
const url = 'mongodb+srv://jerryngai223:20030223@cluster0.nvtdjc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Function to authenticate a user
export default async function authenticateUser(username: string, password: string) {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db('text');

        const usersCollection = db.collection('usersnamepw');
        if (await usersCollection.findOne({ username, password })) {
            console.log('User authenticated successfully!');
            return true;
        }
        console.log('Invalid username or password!');
        return false;
    }
    catch (error) {
        console.error('Error authenticating user:', error);
        return false;
    }
}
