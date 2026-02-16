import app from '../src/server';
import connectDB from '../src/config/db';

export default async function handler(req: any, res: any) {
    // Basic CORS support for the entry point
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log(`[API] ${req.method} ${req.url}`);
        await connectDB();
    } catch (error: any) {
        console.error("[CRITICAL] Database Connection Failed:", error);
        return res.status(500).json({
            error: "Database Connection Failed",
            message: error.message,
            hint: "Please check MONGO_URI in Vercel Environment Variables"
        });
    }

    return app(req, res);
}
