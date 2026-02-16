import express from 'express';
import { createComplaint, getAllComplaints, updateComplaintStatus } from '../controllers/complaint.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = express.Router();

// Public: File a complaint (can be anonymous or authenticated if token header is sent)
// We'll make it open but check for token optionally in controller if needed, 
// BUT for simplicity, let's allow anyone to POST.
// If valid token is present, middleware attaches user.
import jwt from 'jsonwebtoken';
const optionalAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        // Try to verify but don't fail if invalid, just don't attach user
        jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
            if (!err) req.user = user;
            next();
        });
    } else {
        next();
    }
};

router.post('/', optionalAuth, createComplaint);

// Admin: View and Manage Complaints
router.get('/', authenticateToken, authorizeRole(['GOV_ADMIN']), getAllComplaints);
router.patch('/:id/status', authenticateToken, authorizeRole(['GOV_ADMIN']), updateComplaintStatus);

export default router;
