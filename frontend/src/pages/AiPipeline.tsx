import { motion } from 'framer-motion';
import { Database, FileText, Cpu, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const steps = [
    {
        id: 1,
        title: "Data Ingestion",
        icon: Database,
        desc: "Aggregating company reports, satellite imagery, and historical emissions data.",
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        id: 2,
        title: "Preprocessing & NLP",
        icon: FileText,
        desc: "Extracting claims, cleaning data, and identifying key ESG metrics from unstructured text.",
        color: "text-purple-500",
        bg: "bg-purple-50"
    },
    {
        id: 3,
        title: "AI Validation Engine",
        icon: Cpu,
        desc: "Cross-referencing claims with satellite data and statistical anomaly models.",
        color: "text-indigo-500",
        bg: "bg-indigo-50"
    },
    {
        id: 4,
        title: "Risk Scoring",
        icon: AlertTriangle,
        desc: "Calculating Fraud Probability (0-100) and Greenwashing Risk Index.",
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        id: 5,
        title: "Regulatory Decision",
        icon: ShieldCheck,
        desc: "Automated flagging for human review or instant verification for low-risk claims.",
        color: "text-green-500",
        bg: "bg-green-50"
    }
];

const AiPipeline = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">System Architecture</Badge>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">AI Verification Pipeline</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Visualizing the flow of data through our multi-stage fraud detection engine.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 z-0" />

                    <div className="space-y-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    } flex-col`}
                            >
                                {/* Content Card */}
                                <div className="flex-1 w-full">
                                    <Card className="hover:shadow-lg transition-shadow border-slate-200">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-lg ${step.bg}`}>
                                                    <step.icon className={`h-6 w-6 ${step.color}`} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                                                        Step {step.id}: {step.title}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Center Connector Node */}
                                <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-200 shadow-sm z-10">
                                    <div className="w-4 h-4 rounded-full bg-forest-500" />
                                </div>

                                {/* Spacer for alternate side */}
                                <div className="flex-1 hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiPipeline;
