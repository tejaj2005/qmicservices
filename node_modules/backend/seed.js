const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { Schema } = mongoose;

dotenv.config();

// Define schema inline to avoid import issues
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        enum: ['GOV_ADMIN', 'COMPANY_USER', 'PUBLIC_USER'],
        default: 'COMPANY_USER'
    },
    companyName: { type: String },
    companyDetails: {
        registrationNumber: String,
        address: String
    },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Pre-save hook
UserSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

const User = mongoose.model('User', UserSchema);

const seedUsers = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carbon_fraud_detection';
        await mongoose.connect(uri);
        console.log('MongoDB Connected for Seeding');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users');

        const users = [
            {
                email: 'government@user.in',
                password: 'Password12',
                role: 'GOV_ADMIN',
                isVerified: true
            },
            {
                email: 'company@user.in',
                password: 'Password12',
                role: 'COMPANY_USER',
                companyName: 'Acme Carbon Ltd',
                isVerified: true,
                companyDetails: { registrationNumber: 'REG-SEED-001' }
            },
            {
                email: 'people@user.in',
                password: 'Password',
                role: 'PUBLIC_USER',
                isVerified: true
            }
        ];

        for (const u of users) {
            // We pass 'password' to 'passwordHash' field, and the pre-save hook will hash it
            // Note: The pre-save hook expects 'this.passwordHash' to be the plain text initially if modified
            // So we set passwordHash: u.password
            await User.create({
                email: u.email,
                passwordHash: u.password,
                role: u.role,
                companyName: u.companyName,
                companyDetails: u.companyDetails,
                isVerified: u.isVerified
            });
        }

        console.log('Users Seeded Successfully!');
        console.log('1. Govt: government@user.in / Password12');
        console.log('2. Company: company@user.in / Password12');
        console.log('3. Public: people@user.in / Password');

        process.exit(0);
    } catch (error) {
        console.error('Seeding Failed:', error);
        process.exit(1);
    }
};

seedUsers();
