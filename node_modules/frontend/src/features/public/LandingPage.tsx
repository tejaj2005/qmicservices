import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, Activity, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-900/20 via-background to-background -z-10" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge variant="outline" className="mb-4 text-forest-600 border-forest-200 bg-forest-50 px-3 py-1">
                            Official Regulatory Platform
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-forest-900 via-forest-700 to-forest-500">
                            Carbon Integrity <br /> & Fraud Detection
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                            The national standard for verifying carbon credits, detecting greenwashing, and ensuring environmental compliance through advanced AI intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/login">
                                <Button size="lg" className="bg-forest-900 hover:bg-forest-800 text-white w-full sm:w-auto">
                                    Access Portal <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link to="/architecture">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    View AI Architecture
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-forest-500/20 to-blue-500/20 rounded-full blur-3xl -z-10" />
                        <Card className="border-forest-100/50 shadow-2xl shadow-forest-900/10 backdrop-blur-md bg-white/40">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-forest-600" />
                                    Live Risk Monitor
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Fraud Detection Rate</span>
                                        <span className="font-bold text-forest-700">99.8%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "99.8%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-forest-600"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="p-3 rounded-lg bg-forest-50/50 border border-forest-100">
                                        <div className="text-2xl font-bold text-forest-900">12.4M</div>
                                        <div className="text-xs text-forest-600">Verified Tons</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-red-50/50 border border-red-100">
                                        <div className="text-2xl font-bold text-red-900">342</div>
                                        <div className="text-xs text-red-600">Blocked Claims</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-forest-900 mb-4">Regulatory Intelligence</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Powered by satellite analysis, NLP audits, and statistical anomaly detection.
                        </p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: ShieldCheck,
                                title: "AI Verification",
                                desc: "Automated analysis of ESG reports against satellite ground truth data."
                            },
                            {
                                icon: BarChart3,
                                title: "Anomaly Detection",
                                desc: "Statistical models identify unrealistic emission reduction claims instantly."
                            },
                            {
                                icon: Globe,
                                title: "Global Transparency",
                                desc: "Publicly accessible registry of verified projects and their impact."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Card className="h-full border-transparent hover:border-forest-100 transition-all duration-300 hover:shadow-lg">
                                    <CardHeader>
                                        <div className="h-12 w-12 rounded-lg bg-forest-50 flex items-center justify-center mb-4 group-hover:bg-forest-600 transition-colors duration-300">
                                            <feature.icon className="h-6 w-6 text-forest-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <CardTitle>{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
