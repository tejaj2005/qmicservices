import { Request, Response } from 'express';
import Project from '../models/project.model';

// Create Project (Company Only)
export const createProject = async (req: Request, res: Response) => {
    try {
        const { title, description, location, carbonTons } = req.body;
        const userId = (req as any).user.id;

        // Simulate initial AI Analysis
        const aiScore = Math.floor(Math.random() * 100);
        const flags = [];
        if (aiScore < 70) flags.push('Low Vegetation Index');
        if (carbonTons > 10000) flags.push('Unusually High Claims');

        const project = await Project.create({
            title,
            description,
            location,
            carbonTons,
            owner: userId,
            aiAnalysis: {
                score: aiScore,
                flags
            }
        });

        res.status(201).json(project);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get My Projects (Company Only)
export const getMyProjects = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const projects = await Project.find({ owner: userId }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Projects (Admin Only - Pending/All)
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const query = status ? { status } : {};
        const projects = await Project.find(query).populate('owner', 'email companyName');
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Verify Project (Admin Only)
export const verifyProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // VERIFIED or REJECTED

        const project = await Project.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.json(project);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get Verified Projects (Public)
export const getPublicProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find({ status: 'VERIFIED' })
            .populate('owner', 'companyName')
            .sort({ createdAt: -1 });
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
