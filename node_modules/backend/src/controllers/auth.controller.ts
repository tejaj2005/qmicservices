import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_12345';

const generateToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req: Request, res: Response) => {
    const { email, password, role, companyName, companyDetails } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Determine verification status
    // Gov Admins and Public Users are auto-verified for this demo
    // Company Users require approval
    const isVerified = role === 'COMPANY_USER' ? false : true;

    // Create user
    try {
        const user = await User.create({
            email,
            passwordHash: password, // Will be hashed by pre-save hook
            role: role || 'COMPANY_USER',
            companyName,
            isVerified,
            companyDetails
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                token: generateToken(user.id),
                companyName: user.companyName
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        console.error('[AUTH ERROR] Register failed:', error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Check verification status
            if (!user.isVerified) {
                return res.status(403).json({
                    message: 'Account pending approval. Please wait for Government verification.'
                });
            }

            res.json({
                _id: user.id,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
                companyName: user.companyName
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        console.error('[AUTH ERROR] Login failed:', error);
        console.error(error.stack);
        res.status(500).json({ message: error.message });
    }
};

export const getMe = async (req: any, res: Response) => {
    // req.user is populated by auth middleware
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
