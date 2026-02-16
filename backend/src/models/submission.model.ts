import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
    companyId: mongoose.Types.ObjectId;
    projectName: string;
    description: string;
    claimedCredits: number;
    location: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
    aiAnalysis?: any;
    riskScore?: number;
    evidenceFiles: string[];
}

const SubmissionSchema = new Schema<ISubmission>({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    claimedCredits: { type: Number, required: true },
    location: { type: String, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED'],
        default: 'PENDING'
    },
    aiAnalysis: { type: Object }, // Storing JSON result from AI service
    riskScore: { type: Number },
    evidenceFiles: [{ type: String }]
}, {
    timestamps: true
});

const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
export default Submission;
