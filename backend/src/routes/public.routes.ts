import express from 'express';
import { searchCompanies, getCompanyTransparency } from '../controllers/public.controller';

const router = express.Router();

router.get('/companies', searchCompanies); // Public access
router.get('/transparency/:id', getCompanyTransparency);

export default router;
