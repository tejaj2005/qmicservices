import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    role: 'GOV_ADMIN' | 'COMPANY_USER' | 'PUBLIC_USER';
    companyName?: string;
    isVerified: boolean;
    companyDetails?: {
        registrationNumber?: string;
        address?: string;
        contactPerson?: string;
    };
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        enum: ['GOV_ADMIN', 'COMPANY_USER', 'PUBLIC_USER'],
        default: 'COMPANY_USER'
    },
    companyName: { type: String },
    isVerified: { type: Boolean, default: false },
    companyDetails: {
        registrationNumber: String,
        address: String,
        contactPerson: String
    }
}, {
    timestamps: true
});

// Method to check password
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Pre-save hook to hash password
// Pre-save hook to hash password
UserSchema.pre('save', async function (this: any) {
    if (!this.isModified('passwordHash')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
