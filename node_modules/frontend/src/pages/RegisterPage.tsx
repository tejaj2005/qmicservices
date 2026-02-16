import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ShieldCheck, Loader2, Building2, User } from 'lucide-react';

const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    companyName: z.string().optional(),
    registrationNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState<'PUBLIC_USER' | 'COMPANY_USER'>('PUBLIC_USER');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const payload = {
                email: data.email,
                password: data.password,
                role: role,
                companyName: role === 'COMPANY_USER' ? data.companyName : undefined,
                companyDetails: role === 'COMPANY_USER' ? {
                    registrationNumber: data.registrationNumber
                } : undefined
            };

            await axios.post('http://localhost:3001/api/auth/register', payload);

            if (role === 'COMPANY_USER') {
                setSuccess('Application submitted! Your account is pending Government approval. You will be notified once verified.');
            } else {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
            <Card className="w-full max-w-md border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-primary/10">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center font-heading">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Join the National Carbon Credit Fraud Detection Platform
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center mb-6">
                        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                            <button
                                onClick={() => setRole('PUBLIC_USER')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${role === 'PUBLIC_USER'
                                    ? 'bg-background shadow-sm text-foreground font-medium'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <User className="w-4 h-4" /> Public
                            </button>
                            <button
                                onClick={() => setRole('COMPANY_USER')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${role === 'COMPANY_USER'
                                    ? 'bg-background shadow-sm text-foreground font-medium'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Building2 className="w-4 h-4" /> Company
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4 text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-primary/15 text-primary text-sm p-3 rounded-md mb-4 text-center">
                            {success}
                        </div>
                    )}

                    {!success && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="name@example.com" {...register('email')} />
                                {errors.email && <p className="text-xs text-destructive">{errors.email.message as string}</p>}
                            </div>

                            {role === 'COMPANY_USER' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Company Name</Label>
                                        <Input id="companyName" placeholder="Acme Corp" {...register('companyName')} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="registrationNumber">Registration Number</Label>
                                        <Input id="registrationNumber" placeholder="REG-12345" {...register('registrationNumber')} />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register('password')} />
                                {errors.password && <p className="text-xs text-destructive">{errors.password.message as string}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message as string}</p>}
                            </div>

                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create account'}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline underline-offset-4">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;
