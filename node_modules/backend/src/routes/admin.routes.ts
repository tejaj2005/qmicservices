import express from 'express';
import PendingCompany from '../models/pendingCompany.model';
import ActivityLog from '../models/activityLog.model';
import { getPendingCompanies, verifyCompany } from '../controllers/admin.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = express.Router();

// Protected Admin Routes
router.get('/pending-companies', authenticateToken, authorizeRole(['GOV_ADMIN']), getPendingCompanies);
router.post('/verify-company/:id', authenticateToken, authorizeRole(['GOV_ADMIN']), verifyCompany);

// Helper to get Activity Logs
router.get('/activity', authenticateToken, authorizeRole(['GOV_ADMIN']), async (req, res) => {
    try {
        const logs = await ActivityLog.find()
            .populate('user', 'email companyName')
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch activity logs' });
    }
});

export default router;
