import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Project from '../models/project.model';
import Submission from '../models/submission.model';
import Complaint from '../models/complaint.model';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await User.deleteMany({});
        await Project.deleteMany({});
        await Submission.deleteMany({});
        await Complaint.deleteMany({});
        console.log('Cleared existing data');

        // 1. Create Users - Pass PLAIN TEXT passwords, let model hash them
        const government = await User.create({
            email: 'government@user.in',
            passwordHash: 'Password12',
            role: 'GOV_ADMIN',
            isVerified: true,
            companyName: 'Dept of Environment'
        });

        const company = await User.create({
            email: 'company@user.in',
            passwordHash: 'Password12',
            role: 'COMPANY_USER',
            companyName: 'GreenEarth Solutions',
            isVerified: true,
            companyDetails: { registrationNumber: 'REG-2024-001', address: '123 Forest Lane' }
        });

        const pendingCompany = await User.create({
            email: 'newco@user.in',
            passwordHash: 'Password12',
            role: 'COMPANY_USER',
            companyName: 'NewCo Innovations',
            isVerified: false, // Pending Approval
            companyDetails: { registrationNumber: 'PENDING-002', address: '456 Startup Blvd' }
        });

        const publicUser = await User.create({
            email: 'people@user.in',
            passwordHash: 'Password',
            role: 'PUBLIC_USER',
            isVerified: true
        });

        console.log('Users Created');

        // 2. Create Projects (for Company Dashboard)
        const projects = await Project.create([
            {
                title: 'Amazon Rainfall Preservation',
                description: 'Protecting 500 hectares of rainforest from illegal logging through community patrols and satellite monitoring.',
                location: 'Manaus, Brazil',
                carbonTons: 12500,
                owner: company._id,
                status: 'VERIFIED',
                aiAnalysis: { score: 92, flags: [] }
            },
            {
                title: 'Solar Farm Initiative',
                description: 'Replacing coal power with a 50MW solar array in Rajasthan.',
                location: 'Rajasthan, India',
                carbonTons: 5000,
                owner: company._id,
                status: 'PENDING',
                aiAnalysis: { score: 78, flags: ['Unverified Grid Data'] }
            }
        ]);

        console.log('Projects Created');

        // 3. Create Submissions (for Gov Dashboard)
        await Submission.create([
            {
                companyId: company._id,
                projectName: 'Coastal Mangrove Restoration',
                description: 'Planting 10,000 mangrove saplings to sequester carbon and protect coastlines.',
                claimedCredits: 2000,
                location: 'Sundarbans, India',
                status: 'PENDING',
                aiAnalysis: {
                    esgAnalysis: { contradictionScore: 10, flaggedKeywords: [], sentiment: 'positive' },
                    anomalyDetection: { deviationPercentage: 5, isFlagged: false },
                    satelliteValidation: { landUseMatchScore: 95, status: 'MATCH' },
                    riskScore: { fraudProbability: 12, overallRiskLevel: 'LOW' }
                },
                riskScore: 12
            },
            {
                companyId: company._id,
                projectName: 'Urban Reforestation',
                description: 'planting trees in the city',
                claimedCredits: 50000, // Suspiciously high
                location: 'Mumbai, India',
                status: 'FLAGGED',
                aiAnalysis: {
                    esgAnalysis: { contradictionScore: 80, flaggedKeywords: ['theoretical'], sentiment: 'negative' },
                    anomalyDetection: { deviationPercentage: 400, isFlagged: true },
                    satelliteValidation: { landUseMatchScore: 20, status: 'MISMATCH' },
                    riskScore: { fraudProbability: 88, overallRiskLevel: 'CRITICAL' }
                },
                riskScore: 88
            }
        ]);

        console.log('Submissions Created');

        // 4. Create Complaints (for Gov Dashboard)
        await Complaint.create([
            {
                title: 'GreenEarth Solutions - Overreporting',
                description: 'I visited the site and saw significantly fewer trees than claimed in their latest report.',
                status: 'PENDING',
                filedBy: publicUser._id,
                evidence: ['GlobalForestWatch_Screenshot.png']
            },
            {
                title: 'Suspicious Land Clearing near Solar Farm',
                description: 'Satellite imagery suggests they cleared protected forest to build the solar farm.',
                status: 'INVESTIGATING',
                anonymousName: 'Local Resident'
            }
        ]);

        console.log('Complaints Created');

        console.log('-----------------------------------');
        console.log('Seeding Complete! Login Credentials:');
        console.log('Gov Admin: government@user.in / Password12');
        console.log('Company:   company@user.in / Password12');
        console.log('Pending Co: newco@user.in / Password12');
        console.log('Public:    people@user.in / Password');
        console.log('-----------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('Seeding Failed:', error);
        process.exit(1);
    }
};

seedUsers();
