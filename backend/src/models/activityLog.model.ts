import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityLog extends Document {
    user: mongoose.Types.ObjectId;
    action: string;
    target?: string;
    details?: any;
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    target: { type: String },
    details: { type: Schema.Types.Mixed },
    severity: {
        type: String,
        enum: ['INFO', 'WARNING', 'CRITICAL'],
        default: 'INFO'
    }
}, {
    timestamps: true
});

const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
export default ActivityLog;
