import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, TreePine, BarChart3, Clock, CheckCircle, XCircle, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import api from '../../services/api';

const CompanyDashboard = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects/my');
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            await api.post('/projects', data);
            setIsDialogOpen(false);
            reset();
            fetchProjects(); // Refresh list
        } catch (error) {
            console.error("Failed to create project", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-forest-900 font-heading">Company Dashboard</h1>
                    <p className="text-muted-foreground">Manage your carbon credit projects and track verification status.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-forest-600 hover:bg-forest-700">
                            <Plus className="mr-2 h-4 w-4" /> New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Submit New Carbon Project</DialogTitle>
                            <CardDescription>Enter project details for AI and Government verification.</CardDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Project Title</Label>
                                <Input id="title" {...register('title', { required: true })} placeholder="e.g. Amazon Reforestation Initiative" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location / Coordinates</Label>
                                <Input id="location" {...register('location', { required: true })} placeholder="Lat, Long or City, Country" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="carbonTons">Estimated Carbon Offset (Tons)</Label>
                                <Input id="carbonTons" type="number" {...register('carbonTons', { required: true })} placeholder="1000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Project Description</Label>
                                <textarea
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]"
                                    id="description"
                                    {...register('description', { required: true })}
                                    placeholder="Describe the methodology and impact..."
                                    {...register('description', { required: true })}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={submitting}>
                                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {submitting ? 'Submitting...' : 'Submit for Verification'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-semibold line-clamp-1">{project.title}</CardTitle>
                                <div className="text-xs text-muted-foreground flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <StatusBadge status={project.status} />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-xs">Offset Claim</span>
                                    <span className="font-semibold">{project.carbonTons} Tons</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-xs">AI Initial Score</span>
                                    <span className={`font-semibold ${getScoreColor(project.aiAnalysis?.score)}`}>
                                        {project.aiAnalysis?.score || 'N/A'}/100
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                                <span className="font-medium text-forest-900">Location:</span> {project.location}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Card Stub */}
                <div
                    className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-forest-400 hover:text-forest-600 cursor-pointer transition-all h-[200px]"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Plus className="h-8 w-8 mb-2" />
                    <span className="font-medium">Submit New Project</span>
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'VERIFIED':
            return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
        case 'REJECTED':
            return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
        default:
            return <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100"><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Pending</Badge>;
    }
};

const getScoreColor = (score?: number) => {
    if (!score) return 'text-slate-500';
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
};

export default CompanyDashboard;
