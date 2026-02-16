import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    action: string;
    details: string;
    ipAddress?: string;
}

const AuditLogSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    details: { type: String },
    ipAddress: { type: String }
}, {
    timestamps: true
});

const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
export default AuditLog;
