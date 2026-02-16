import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, ShieldCheck, Filter, Activity, Users, Building2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import api from '../../services/api';
import ActivityFeed from './ActivityFeed';

const riskData = [
    { name: 'Jan', risk: 400, verified: 2400 },
    { name: 'Feb', risk: 300, verified: 1398 },
    { name: 'Mar', risk: 200, verified: 9800 },
    { name: 'Apr', risk: 278, verified: 3908 },
    { name: 'May', risk: 189, verified: 4800 },
    { name: 'Jun', risk: 239, verified: 3800 },
    { name: 'Jul', risk: 349, verified: 4300 },
];

const anomalyData = [
    { name: 'Mon', anomalies: 4 },
    { name: 'Tue', anomalies: 7 },
    { name: 'Wed', anomalies: 2 },
    { name: 'Thu', anomalies: 12 },
    { name: 'Fri', anomalies: 5 },
    { name: 'Sat', anomalies: 8 },
    { name: 'Sun', anomalies: 3 },
];

const recentFlags = [
    { id: '1023', company: 'EcoCorp Ltd', issue: 'Satellite Mismatch', severity: 'HIGH', time: '2h ago' },
    { id: '1024', company: 'GreenFuture Inc', issue: 'Vegetation Index Low', severity: 'MEDIUM', time: '5h ago' },
    { id: '1025', company: 'CarbonZero', issue: 'Duplicate Claim', severity: 'CRITICAL', time: '1d ago' },
];

interface PendingCompany {
    _id: string;
    email: string;
    companyName: string;
    companyDetails?: {
        registrationNumber: string;
    };
    createdAt: string;
}

const GovDashboard = () => {
    const [pendingCompanies, setPendingCompanies] = useState<PendingCompany[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState<'ALL' | 'HIGH_PRIORITY'>('ALL');
    const [feedTab, setFeedTab] = useState<'ANOMALIES' | 'ACTIVITY'>('ANOMALIES');

    useEffect(() => {
        fetchPendingCompanies();
    }, []);

    const fetchPendingCompanies = async () => {
        try {
            const { data } = await api.get('/admin/pending-companies');
            setPendingCompanies(data);
        } catch (error) {
            console.error('Failed to fetch pending companies', error);
        }
    };

    const handleVerification = async (id: string, action: 'APPROVE' | 'REJECT') => {
        setIsLoading(true);
        try {
            await api.post(`/admin/verify-company/${id}`, { action });
            // Remove from list locally
            setPendingCompanies(prev => prev.filter(c => c._id !== id));
        } catch (error) {
            console.error('Verification failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8 bg-slate-50 dark:bg-zinc-900 min-h-screen transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-forest-900 dark:text-forest-100 font-heading">National Oversight Dashboard</h1>
                    <p className="text-muted-foreground">Real-time fraud detection and compliance monitoring.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={filter === 'ALL' ? "default" : "outline"} onClick={() => setFilter('ALL')}>
                        <Filter className="mr-2 h-4 w-4" /> All
                    </Button>
                    <Button variant={filter === 'HIGH_PRIORITY' ? "destructive" : "outline"} onClick={() => setFilter((prev) => prev === 'HIGH_PRIORITY' ? 'ALL' : 'HIGH_PRIORITY')}>
                        <AlertTriangle className="mr-2 h-4 w-4" /> High Priority
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fraud Detection Rate</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-forest-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                        <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Investigations</CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+4 new since yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Registered Entities</CardTitle>
                        <Building2 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,203</div>
                        <p className="text-xs text-muted-foreground">+12 this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <Users className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingCompanies.length}</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                {/* Main Chart */}
                <Card className="col-span-1 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Verification vs Risk Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={riskData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip
                                    contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="verified" name="Verified Credits" fill="#0E3B2E" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="risk" name="Risk Flagged" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Flags & Activity Feed */}
                <Card className="col-span-1 lg:col-span-3 min-h-[450px]">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle>Live Monitor</CardTitle>
                            <div className="flex gap-1 text-xs bg-muted p-1 rounded-md">
                                <button
                                    onClick={() => setFeedTab('ANOMALIES')}
                                    className={`px-3 py-1 rounded-sm transition-all ${feedTab === 'ANOMALIES' ? 'bg-background shadow font-medium' : 'hover:bg-background/50 text-muted-foreground'}`}
                                >
                                    Anomalies
                                </button>
                                <button
                                    onClick={() => setFeedTab('ACTIVITY')}
                                    className={`px-3 py-1 rounded-sm transition-all ${feedTab === 'ACTIVITY' ? 'bg-background shadow font-medium' : 'hover:bg-background/50 text-muted-foreground'}`}
                                >
                                    Activity Log
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {feedTab === 'ANOMALIES' ? (
                            <div className="p-6 pt-0 space-y-6">
                                {recentFlags.map((flag) => (
                                    <div key={flag.id} className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => window.location.href = '/gov/investigations'}>
                                        <div className="space-y-1">
                                            <div className="font-semibold">{flag.company}</div>
                                            <div className="text-xs text-muted-foreground flex items-center">
                                                <AlertTriangle className="h-3 w-3 mr-1 text-red-500" />
                                                {flag.issue}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant={flag.severity === 'CRITICAL' ? 'destructive' : 'warning'}>
                                                {flag.severity}
                                            </Badge>
                                            <div className="text-xs text-muted-foreground mt-1">{flag.time}</div>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 border-t">
                                    <h4 className="text-sm font-medium mb-4">Weekly Anomaly Spike</h4>
                                    <div className="h-[140px] w-full mt-2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={anomalyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                                <Line type="monotone" dataKey="anomalies" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                                                <Tooltip
                                                    contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                    labelStyle={{ color: 'black', fontWeight: 600 }}
                                                />
                                                <XAxis dataKey="name" hide />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ActivityFeed />
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Company Approvals Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TreePine className="h-5 w-5 text-forest-600" />
                            Project Verification Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProjectVerificationList />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Company Registration Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {pendingCompanies.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No pending company registrations.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pendingCompanies.map((company) => (
                                    <div key={company._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-card transition-colors">
                                        <div className="mb-4 md:mb-0">
                                            <h3 className="font-semibold text-lg">{company.companyName}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-muted-foreground mt-1">
                                                <p>Email: {company.email}</p>
                                                <p>Reg Num: {company.companyDetails?.registrationNumber || 'N/A'}</p>
                                                <p>Applied: {new Date(company.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="default"
                                                className="bg-forest-600 hover:bg-forest-700"
                                                onClick={() => handleVerification(company._id, 'APPROVE')}
                                                disabled={isLoading}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleVerification(company._id, 'REJECT')}
                                                disabled={isLoading}
                                            >
                                                <XCircle className="w-4 h-4 mr-1" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Citizen Complaints Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                            Citizen Complaints
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ComplaintsList />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Sub-components
import { TreePine } from 'lucide-react';

const ProjectVerificationList = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects/admin?status=PENDING');
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleVerify = async (id: string, status: 'VERIFIED' | 'REJECTED') => {
        setLoading(true);
        try {
            await api.patch(`/projects/${id}/verify`, { status });
            setProjects(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (projects.length === 0) return <div className="text-center py-8 text-muted-foreground">No pending projects.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(p => (
                <div key={p._id} className="border rounded-lg p-4 bg-white flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-forest-900">{p.title}</h3>
                            <Badge variant={p.aiAnalysis?.score > 70 ? 'default' : 'destructive'}>
                                AI Score: {p.aiAnalysis?.score}/100
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{p.owner?.companyName}</p>
                        <div className="mt-2 text-sm space-y-1">
                            <p><strong>Carbon:</strong> {p.carbonTons} Tons</p>
                            <p><strong>Location:</strong> {p.location}</p>
                            <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                        </div>
                        {p.aiAnalysis?.flags?.length > 0 && (
                            <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                                <strong>Flags:</strong> {p.aiAnalysis.flags.join(', ')}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button size="sm" className="w-full bg-forest-600" onClick={() => handleVerify(p._id, 'VERIFIED')} disabled={loading}>
                            Verify
                        </Button>
                        <Button size="sm" variant="destructive" className="w-full" onClick={() => handleVerify(p._id, 'REJECTED')} disabled={loading}>
                            Reject
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ComplaintsList = () => {
    const [complaints, setComplaints] = useState<any[]>([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const { data } = await api.get('/admin/complaints');
                setComplaints(data);
            } catch (err) {
                console.error("Failed to fetch complaints", err);
            }
        };
        fetchComplaints();
    }, []);

    if (complaints.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">No active complaints.</div>;
    }

    return (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {complaints.map((c: any) => (
                <div key={c._id} className="p-4 border rounded-lg bg-amber-50/30 border-amber-100">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-forest-900">{c.title}</h4>
                        <Badge variant="outline" className="text-xs">{c.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{c.description}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                        <span>By: {c.anonymousName || c.filedBy?.email || 'Anonymous'}</span>
                        <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GovDashboard;
