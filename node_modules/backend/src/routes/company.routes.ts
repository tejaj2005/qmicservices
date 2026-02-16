import express from 'express';
import { submitCreditClaim, getMySubmissions } from '../controllers/company.controller';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole('COMPANY_USER'));

router.post('/submit', submitCreditClaim);
router.get('/claims', getMySubmissions);

export default router;
