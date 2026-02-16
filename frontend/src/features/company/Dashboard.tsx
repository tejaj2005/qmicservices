import { FileText, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

// Mock data until API is connected
const submissions = [
    { id: '1', project: 'Reforestation Project A', amount: 5000, status: 'APPROVED', date: '2023-10-12' },
    { id: '2', project: 'Solar Farm B', amount: 12000, status: 'PENDING', date: '2023-11-05' },
    { id: '3', project: 'Methane Capture C', amount: 3500, status: 'FLAGGED', date: '2023-11-20' },
];

const CompanyDashboard = () => {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-forest-900">Company Dashboard</h1>
                    <p className="text-muted-foreground">Manage your carbon credit portfolio and submissions.</p>
                </div>
                <Link to="/company/submit">
                    <Button className="bg-forest-600 hover:bg-forest-700">
                        <Plus className="mr-2 h-4 w-4" /> New Submission
                    </Button>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Credits Verified</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5,000 tCO2e</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,000 tCO2e</div>
                        <p className="text-xs text-muted-foreground">Est. completion: 2 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Risk Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">1 Flagged</div>
                        <p className="text-xs text-muted-foreground">Action required on Project C</p>
                    </CardContent>
                </Card>
            </div>

            {/* Submissions List */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {submissions.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-100 rounded">
                                        <FileText className="h-5 w-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{sub.project}</h4>
                                        <div className="text-sm text-muted-foreground block md:hidden">
                                            {sub.amount} tCO2e
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block text-sm font-medium">
                                    {sub.amount.toLocaleString()} tCO2e
                                </div>
                                <div className="hidden md:block text-sm text-muted-foreground">
                                    {sub.date}
                                </div>
                                <div>
                                    {sub.status === 'APPROVED' && <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>}
                                    {sub.status === 'PENDING' && <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Processing</Badge>}
                                    {sub.status === 'FLAGGED' && <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" /> Flagged</Badge>}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CompanyDashboard;
