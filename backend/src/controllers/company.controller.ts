import { Response } from 'express';
import mongoose from 'mongoose';
import Submission, { ISubmission } from '../models/submission.model';
import { analyzeSubmission } from '../services/ai.service'; // Use the new comprehensive analysis
import { AuthRequest } from '../middleware/auth.middleware';

// Helper to get historical average from DB
const getHistoricalAverage = async (companyId: string) => {
    const history = await Submission.find({ companyId: new mongoose.Types.ObjectId(companyId) });
    if (history.length === 0) return 0;
    const total = history.reduce((sum, sub) => sum + sub.claimedCredits, 0);
    return total / history.length;
};

const getHistoryArray = async (companyId: string) => {
    const history = await Submission.find({ companyId: new mongoose.Types.ObjectId(companyId) }).sort({ createdAt: -1 }).limit(10);
    return history.map(h => h.claimedCredits);
};

export const submitCreditClaim = async (req: AuthRequest, res: Response) => {
    const { projectName, description, claimedAmount, location, evidenceFiles } = req.body;
    const companyId = req.user.id; // From Auth Middleware

    try {
        // 1. Fetch History for Anomaly Detection
        const historicalCredits = await getHistoryArray(companyId);

        // 2. Run AI Analysis
        const analysisData = {
            description,
            claimedCredits: Number(claimedAmount),
            historicalCredits,
            coordinates: location // Assuming location string or coords
        };

        const aiResult = await analyzeSubmission(analysisData);

        // 3. Determine Status based on AI Risk
        let status = 'PENDING';
        if (aiResult.riskScore.overallRiskLevel === 'CRITICAL' || aiResult.riskScore.overallRiskLevel === 'HIGH') {
            status = 'FLAGGED';
        }

        // 4. Save to DB
        const newSubmission = await Submission.create({
            companyId: new mongoose.Types.ObjectId(companyId),
            projectName,
            description,
            claimedCredits: Number(claimedAmount),
            location,
            evidenceFiles: evidenceFiles || [],
            status,
            aiAnalysis: aiResult,
            riskScore: aiResult.riskScore.fraudProbability
        });

        res.status(201).json({
            message: 'Submission received and analyzed',
            submission: newSubmission
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Error processing submission', error: error.message });
    }
};

export const getMySubmissions = async (req: AuthRequest, res: Response) => {
    const companyId = req.user.id;
    try {
        const mySubmissions = await Submission.find({ companyId: new mongoose.Types.ObjectId(companyId) }).sort({ createdAt: -1 });
        res.json(mySubmissions);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};
