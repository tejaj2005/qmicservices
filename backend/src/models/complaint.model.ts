import mongoose, { Schema, Document } from 'mongoose';

export interface IComplaint extends Document {
    title: string;
    description: string;
    status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED';
    filedBy?: mongoose.Types.ObjectId; // Optional: Link to User if logged in
    anonymousName?: string; // If not logged in
    evidence?: string[]; // Array of URLs or text
    createdAt: Date;
}

const ComplaintSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'INVESTIGATING', 'RESOLVED'],
        default: 'PENDING'
    },
    filedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    anonymousName: { type: String },
    evidence: [{ type: String }]
}, {
    timestamps: true
});

export default mongoose.model<IComplaint>('Complaint', ComplaintSchema);
