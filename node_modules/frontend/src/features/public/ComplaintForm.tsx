
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:3001/api/complaints', {
                title: data.companyName + ' - ' + data.type,
                description: data.description,
                anonymousName: data.anonymous ? 'Anonymous' : undefined,
                evidence: [] // TODO: Add file upload
            });
            setSubmitted(true);
        } catch (err) {
            setError('Failed to submit complaint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto py-20 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-forest-900 mb-2">Complaint Filed</h2>
                    <p className="text-muted-foreground mb-6">Your report has been securely transmitted to the Government Fraud Detection Unit.</p>
                    <Button onClick={() => navigate('/')} variant="outline">Return Home</Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <div className="text-center mb-10">
                <Badge variant="destructive" className="mb-4">Whistleblower Portal</Badge>
                <h1 className="text-3xl font-bold text-forest-900 mb-2">File an Environmental Complaint</h1>
                <p className="text-muted-foreground">Report suspected greenwashing or fraudulent carbon credit activities.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Report Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Target Company</label>
                                <Input {...register("companyName", { required: true })} placeholder="Company Name" />
                                {errors.companyName && <span className="text-red-500 text-xs">Required</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Name (Optional)</label>
                                <Input {...register("projectName")} placeholder="e.g. Amazon Reforestation" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Violation Type</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                {...register("type", { required: true })}
                            >
                                <option value="">Select violation type...</option>
                                <option value="overreporting">Over-reporting Carbon Offset</option>
                                <option value="deforestation">Hidden Deforestation</option>
                                <option value="human_rights">Human Rights Violation</option>
                                <option value="double_counting">Double Counting Credits</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.type && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description of Evidence</label>
                            <textarea
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[120px]"
                                {...register("description", { required: true })}
                                placeholder="Describe specifically what you observed..."
                            />
                            {errors.description && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg flex gap-3 text-amber-800 text-sm">
                            <AlertTriangle className="h-5 w-5 shrink-0" />
                            <p>All submissions are encrypted. You may choose to remain anonymous.</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="anon" className="rounded border-gray-300" {...register("anonymous")} />
                            <label htmlFor="anon" className="text-sm">Submit anonymously</label>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <Button type="submit" className="w-full bg-forest-600 hover:bg-forest-700" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                            {loading ? 'Submitting...' : 'Submit Report'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ComplaintForm;
