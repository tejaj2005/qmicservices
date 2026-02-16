import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    location: string;
    carbonTons: number;
    owner: mongoose.Types.ObjectId;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    aiAnalysis?: {
        score: number;
        flags: string[];
    };
    documents?: string[];
    createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    carbonTons: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED'],
        default: 'PENDING'
    },
    aiAnalysis: {
        score: { type: Number },
        flags: [{ type: String }]
    },
    documents: [{ type: String }]
}, {
    timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema);
