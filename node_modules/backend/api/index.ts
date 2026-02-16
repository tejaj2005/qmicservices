import app from '../src/server';
import connectDB from '../src/config/db';

export default async function handler(req: any, res: any) {
    // Basic CORS support for the entry point
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log(`[HANDLER] Method: ${req.method}, URL: ${req.url}, OriginalURL: ${req.originalUrl || 'N/A'}`);
        console.log(`[HANDLER] Headers: ${JSON.stringify(req.headers)}`);
        console.log(`[HANDLER] Body: ${JSON.stringify(req.body)}`);

        await connectDB();
        console.log('[HANDLER] DB connected, passing to Express app...');
    } catch (error: any) {
        console.error("[CRITICAL] Database Connection Failed:", error);
        return res.status(500).json({
            error: "Database Connection Failed",
            message: error.message,
            hint: "Please check MONGO_URI in Vercel Environment Variables"
        });
    }

    try {
        return app(req, res);
    } catch (error: any) {
        console.error("[CRITICAL] Express app crashed:", error);
        return res.status(500).json({
            error: "Express Handler Failed",
            message: error.message
        });
    }
}
