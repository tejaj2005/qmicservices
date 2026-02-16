import { Request, Response } from 'express';
import Complaint from '../models/complaint.model';

// Create a new complaint
export const createComplaint = async (req: Request, res: Response) => {
    try {
        const { title, description, anonymousName } = req.body;
        const userId = (req as any).user?.id;

        const complaint = await Complaint.create({
            title,
            description,
            filedBy: userId || undefined,
            anonymousName: userId ? undefined : (anonymousName || 'Anonymous'),
            status: 'PENDING'
        });

        res.status(201).json(complaint);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all complaints (Admin View)
export const getAllComplaints = async (req: Request, res: Response) => {
    try {
        const complaints = await Complaint.find()
            .populate('filedBy', 'email name')
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update complaint status
export const updateComplaintStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json(complaint);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
