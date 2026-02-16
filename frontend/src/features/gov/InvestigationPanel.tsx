import { ArrowLeft, Check, X, FileText, Satellite } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';

const InvestigationPanel = () => {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-6">
            <Link to="/gov">
                <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-forest-900">Case #8492: EcoCorp Forest Expansion</h1>
                        <Badge variant="destructive">HIGH RISK</Badge>
                    </div>
                    <p className="text-muted-foreground">Submitted by: EcoCorp Ltd • Date: Oct 12, 2023</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="destructive"><X className="mr-2 h-4 w-4" /> Reject Claim</Button>
                    <Button className="bg-forest-600 hover:bg-forest-700"><Check className="mr-2 h-4 w-4" /> Approve with Warning</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Evidence View */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Satellite className="mr-2 h-5 w-5 text-blue-500" />
                                Satellite Verification Layer
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-slate-200 rounded-lg relative overflow-hidden group">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-slate-100">
                                    [Satellite Imagery Mock Interface]
                                </div>
                                <div className="absolute bottom-4 left-4 bg-black/70 text-white p-2 rounded text-xs">
                                    Sentinel-2 Imagery
                                </div>
                                <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                    Vegetation Mismatch: -42%
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-800">
                                <strong>AI Finding:</strong> The claimed reforestation area shows significant deforestation patterns in the last 6 months compared to the claimed baseline.
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-forest-500" />
                                ESG Report NLP Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-3 bg-slate-50 border rounded-md">
                                    <p className="text-sm italic text-slate-600">"...we estimate the project will sequester approximately 50,000 tons of CO2 annually based on theoretical models..."</p>
                                    <div className="mt-2 flex gap-2">
                                        <Badge variant="warning">Vague Terminology</Badge>
                                        <Badge variant="warning">Lack of Empirical Data</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Risk Scorecard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-6">
                                <div className="text-5xl font-bold text-red-600 mb-2">87<span className="text-2xl text-muted-foreground">/100</span></div>
                                <div className="text-sm font-medium uppercase tracking-wide text-red-700">Critical Fraud Probability</div>
                            </div>
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex justify-between text-sm">
                                    <span>Anomaly Detection</span>
                                    <span className="font-bold text-red-600">High (92%)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Satellite Match</span>
                                    <span className="font-bold text-orange-500">Poor (23%)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Historical Variance</span>
                                    <span className="font-bold text-yellow-600">Medium (45%)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Audit Trail</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-slate-300 mt-2" />
                                    <div>
                                        <div className="font-medium">System Flagged Claim</div>
                                        <div className="text-xs text-muted-foreground">Today, 10:42 AM by AI Engine</div>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-slate-300 mt-2" />
                                    <div>
                                        <div className="font-medium">Submission Received</div>
                                        <div className="text-xs text-muted-foreground">Today, 10:41 AM by EcoCorp Admin</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default InvestigationPanel;
