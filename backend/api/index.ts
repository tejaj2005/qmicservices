import app from '../src/server';

import connectDB from '../src/config/db';

export default async function handler(req: any, res: any) {
    console.log(`[API] ${req.method} ${req.url}`);
    await connectDB();
    return app(req, res);
}
