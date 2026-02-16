import express from 'express';
import {
    createProject,
    getMyProjects,
    getAllProjects,
    verifyProject,
    getPublicProjects
} from '../controllers/project.controller';
import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

const router = express.Router();

// Public
router.get('/public', getPublicProjects);

// Company
router.post('/', authenticateToken, authorizeRole(['COMPANY_USER']), createProject);
router.get('/my', authenticateToken, authorizeRole(['COMPANY_USER']), getMyProjects);

// Admin
router.get('/admin', authenticateToken, authorizeRole(['GOV_ADMIN']), getAllProjects);
router.patch('/:id/verify', authenticateToken, authorizeRole(['GOV_ADMIN']), verifyProject);

export default router;
