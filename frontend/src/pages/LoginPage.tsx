import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ShieldCheck, Loader2, Lock } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const { login, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState("citizen");

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            setError('');
            await login(data.email, data.password);
            const user = useAuthStore.getState().user;

            // Strict Role Enforcement
            if (activeTab === 'gov' && user?.role !== 'GOV_ADMIN') {
                throw new Error('Access Denied: This account is not authorized for Government access. Please use the Partner or Citizen tab.');
            }
            if (activeTab === 'partner' && user?.role !== 'COMPANY_USER') {
                throw new Error('Access Denied: This appears to be a Citizen or Government account. Please switch tabs.');
            }
            if (activeTab === 'citizen' && user?.role !== 'PUBLIC_USER') {
                // Optional: Allow Public to access if they have a generic account
            }

            if (user?.role === 'GOV_ADMIN') navigate('/gov');
            else if (user?.role === 'COMPANY_USER') navigate('/company');
            else navigate('/search');
        } catch (err: any) {
            if (err.message) {
                setError(err.message);
            } else if (err.response?.status === 403) {
                setError('Account pending approval. Please wait for Government verification.');
            } else {
                setError('Invalid credentials');
            }
            useAuthStore.getState().logout();
        }
    };

    const handleDemoLogin = async (role: string, email: string, pass: string) => {
        try {
            setError('');
            localStorage.removeItem('token'); // Clear any stale session
            await login(email, pass);
            const user = useAuthStore.getState().user;

            if (user?.role === 'GOV_ADMIN') navigate('/gov');
            else if (user?.role === 'COMPANY_USER') navigate('/company');
            else navigate('/search');
        } catch (err: any) {
            if (err.message) {
                setError(err.message);
            } else if (err.response?.status === 403) {
                setError('Account pending approval. Please wait for Government verification.');
            } else {
                setError('Demo login failed. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md border-t-4 border-t-forest-600 shadow-xl">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="bg-forest-50 p-3 rounded-full">
                            <ShieldCheck className="h-8 w-8 text-forest-700" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-forest-900 font-heading">Secure Portal Entry</CardTitle>
                    <CardDescription>Select your access role to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="citizen" onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="citizen">Citizen</TabsTrigger>
                            <TabsTrigger value="partner">Partner</TabsTrigger>
                            <TabsTrigger value="gov">Official</TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={
                                        activeTab === 'gov' ? "official@gov.ph" :
                                            activeTab === 'partner' ? "name@company.com" :
                                                "user@gmail.com"
                                    }
                                    {...register('email')}
                                />
                                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="#" className="text-xs text-forest-600 hover:underline">Forgot password?</Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                />
                                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                            </div>

                            {error && (
                                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm text-center flex items-center justify-center gap-2">
                                    <Lock className="w-4 h-4" /> {error}
                                </div>
                            )}

                            <Button type="submit" className={`w-full ${activeTab === 'gov' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-forest-600 hover:bg-forest-700'}`} disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {activeTab === 'gov' ? 'Verify Official Credentials' : 'Sign In'}
                            </Button>
                        </form>

                        {/* Interactive Demo Login Section */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or Instant Login</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 mt-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-between hover:bg-slate-50 border-slate-200 h-auto py-3"
                                    onClick={() => handleDemoLogin('GOV_ADMIN', 'government@user.in', 'Password12')}
                                    disabled={isLoading}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-slate-900">Government Official</span>
                                        <span className="text-xs text-slate-500">Access Oversight Dashboard</span>
                                    </div>
                                    <ShieldCheck className="h-4 w-4 text-slate-900" />
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-between hover:bg-forest-50 border-forest-100 h-auto py-3"
                                    onClick={() => handleDemoLogin('COMPANY_USER', 'company@user.in', 'Password12')}
                                    disabled={isLoading}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-forest-900">Company Partner</span>
                                        <span className="text-xs text-forest-600">Manage Projects & Claims</span>
                                    </div>
                                    <Lock className="h-4 w-4 text-forest-600" />
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-between hover:bg-blue-50 border-blue-100 h-auto py-3"
                                    onClick={() => handleDemoLogin('PUBLIC_USER', 'people@user.in', 'Password')}
                                    disabled={isLoading}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-blue-900">Public Citizen</span>
                                        <span className="text-xs text-blue-600">View Registry & Report</span>
                                    </div>
                                    <div className="h-4 w-4 rounded-full bg-blue-100 border border-blue-300" />
                                </Button>
                            </div>
                        </div>
                    </Tabs>
                </CardContent>
                <CardFooter className="justify-center flex-col gap-4 text-xs text-muted-foreground border-t bg-muted/20 pt-4">
                    <div className="text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-forest-600 font-medium hover:underline">
                            Register Here
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
