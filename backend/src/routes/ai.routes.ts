// Stubs for other routes to prevent server crash
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'AI Routes' }));
export default router;
