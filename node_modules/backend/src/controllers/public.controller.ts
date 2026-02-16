import { Request, Response } from 'express';
import User from '../models/user.model';
import Submission from '../models/submission.model';

export const searchCompanies = async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
        const filter: any = { role: 'COMPANY_USER' };
        if (query) {
            filter.companyName = { $regex: query, $options: 'i' };
        }

        const companies = await User.find(filter).select('companyName email companyDetails isVerified');
        res.json(companies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCompanyTransparency = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Find company submissions using companyId (stored as ObjectId in Submission, so we don't cast here if we query by string but Mongoose casts filter automatically usually)
        // Wait, I fixed Submission model to use Types.ObjectId.
        // So I should populate or find by ID.
        // Mongoose automatically casts strings to ObjectIds in queries.
        const companySubmissions = await Submission.find({ companyId: id });

        const score = companySubmissions.length > 0
            ? 100 - (companySubmissions.filter(s => s.status === 'FLAGGED').length * 20)
            : 100;

        res.json({
            companyId: id,
            transparencyScore: Math.max(0, score),
            totalSubmissions: companySubmissions.length
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
