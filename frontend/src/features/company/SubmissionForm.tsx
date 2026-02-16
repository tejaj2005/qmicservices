import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Upload, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

// Mock AI Service until backend connected
const simulateAICheck = async (data: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                score: Math.floor(Math.random() * 30) + 70, // 70-100 score
                issues: data.claimedAmount > 10000 ? ["Abnormally high claim volume detected", "Satellite vegetation mismatch"] : [],
                status: data.claimedAmount > 10000 ? "HIGH_RISK" : "LOW_RISK"
            });
        }, 2000);
    });
};

const SubmissionForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState<any>(null);

    const onSubmit = async (data: any) => {
        setIsAnalyzing(true);
        // Simulate AI Check
        const result = await simulateAICheck(data);
        setAiResult(result);
        setIsAnalyzing(false);
        setStep(2);
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-forest-900 mb-8">New Credit Submission</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                    {step === 1 && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Name</label>
                                <Input {...register("projectName", { required: true })} placeholder="e.g. Amazon Reforestation Sector 4" />
                                {errors.projectName && <span className="text-red-500 text-xs">Required</span>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Claimed Credits (tCO2e)</label>
                                <Input type="number" {...register("claimedAmount", { required: true, min: 1 })} placeholder="5000" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">ESG Report Summary</label>
                                <textarea
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                    {...register("description", { required: true })}
                                    placeholder="Paste executive summary here for NLP analysis..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Supporting Documents</label>
                                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">Drag and drop or click to upload PDF/CSV</p>
                                </div>
                            </div>

                            <Button type="submit" disabled={isAnalyzing} className="w-full bg-forest-600 hover:bg-forest-700">
                                {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing with AI...</> : "Run Pre-Submission Check"}
                            </Button>
                        </form>
                    )}

                    {step === 2 && aiResult && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="text-center mb-8">
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${aiResult.status === 'HIGH_RISK' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                    }`}>
                                    {aiResult.status === 'HIGH_RISK' ? <AlertTriangle className="h-8 w-8" /> : <Check className="h-8 w-8" />}
                                </div>
                                <h2 className="text-2xl font-bold">AI Validation Complete</h2>
                                <p className="text-muted-foreground">Your submission has been analyzed.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-lg text-center">
                                    <div className="text-sm text-muted-foreground">Confidence Score</div>
                                    <div className="text-2xl font-bold text-forest-700">{aiResult.score}/100</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg text-center">
                                    <div className="text-sm text-muted-foreground">Risk Level</div>
                                    <Badge variant={aiResult.status === 'HIGH_RISK' ? 'destructive' : 'success'}>
                                        {aiResult.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </div>

                            {aiResult.issues.length > 0 && (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
                                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                                        <AlertTriangle className="h-4 w-4 mr-2" /> Potential Issues Detected
                                    </h4>
                                    <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
                                        {aiResult.issues.map((issue: string, idx: number) => (
                                            <li key={idx}>{issue}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => setStep(1)} className="w-full">Edit Submission</Button>
                                <Button className="w-full bg-forest-600 hover:bg-forest-700">Confirm & Submit</Button>
                            </div>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SubmissionForm;
