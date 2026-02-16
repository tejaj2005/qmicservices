import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Global cached promise for serverless
let cachedPromise: Promise<typeof mongoose> | null = null;

const connectDB = async () => {
    if (cachedPromise) {
        return cachedPromise;
    }

    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    cachedPromise = mongoose.connect(uri)
        .then((conn) => {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
        });

    try {
        return await cachedPromise;
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        // In serverless, we shouldn't exit the process, just throw so the handler catches it
        throw error;
    }
};

export default connectDB;
