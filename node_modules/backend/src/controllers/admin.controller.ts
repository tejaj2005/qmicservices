import { Request, Response } from 'express';
import User from '../models/user.model';

// Get all pending companies
export const getPendingCompanies = async (req: Request, res: Response) => {
    try {
        const pendingCompanies = await User.find({
            role: 'COMPANY_USER',
            isVerified: false
        }).select('-passwordHash');

        res.json(pendingCompanies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a company
export const verifyCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { action } = req.body; // 'APPROVE' or 'REJECT'

    try {
        if (action === 'REJECT') {
            await User.findByIdAndDelete(id);
            return res.json({ message: 'Company application rejected and removed.' });
        }

        const user = await User.findById(id);
        if (user) {
            user.isVerified = true;
            await user.save();
            res.json({ message: `Company ${user.companyName} verified successfully.` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
