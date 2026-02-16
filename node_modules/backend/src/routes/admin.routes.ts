import express from 'express';
import { getPendingCompanies, verifyCompany } from '../controllers/admin.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = express.Router();

// Protected Admin Routes
router.get('/pending-companies', authenticateToken, authorizeRole(['GOV_ADMIN']), getPendingCompanies);
router.post('/verify-company/:id', authenticateToken, authorizeRole(['GOV_ADMIN']), verifyCompany);

export default router;
