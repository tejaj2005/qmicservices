import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Import DB config
import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';
import companyRoutes from './routes/company.routes';
import adminRoutes from './routes/admin.routes';
import publicRoutes from './routes/public.routes';
import complaintRoutes from './routes/complaint.routes';
import projectRoutes from './routes/project.routes';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/projects', projectRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', server: 'CarbonFraudDetection' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
