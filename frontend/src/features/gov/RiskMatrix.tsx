import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const riskData = [
    { x: 10, y: 30, z: 200, name: 'Project A', risk: 'LOW' },
    { x: 50, y: 40, z: 260, name: 'Project B', risk: 'MEDIUM' },
    { x: 80, y: 90, z: 400, name: 'Project C', risk: 'CRITICAL' },
    { x: 20, y: 80, z: 180, name: 'Project D', risk: 'HIGH' },
    { x: 85, y: 25, z: 390, name: 'Project E', risk: 'MEDIUM' },
    { x: 95, y: 85, z: 500, name: 'Project F', risk: 'CRITICAL' },
    { x: 30, y: 20, z: 150, name: 'Project G', risk: 'LOW' },
];

const COLORS = {
    LOW: '#10b981',
    MEDIUM: '#f59e0b',
    HIGH: '#f97316',
    CRITICAL: '#ef4444',
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 border rounded shadow-lg">
                <p className="font-bold text-forest-900">{data.name}</p>
                <div className="text-xs space-y-1">
                    <p>Fraud Prob: {data.x}%</p>
                    <p>Anomaly Score: {data.y}%</p>
                    <p>Volume: {data.z}k</p>
                    <Badge variant={data.risk === 'CRITICAL' ? 'destructive' : 'outline'} className="mt-1">{data.risk}</Badge>
                </div>
            </div>
        );
    }
    return null;
};

const RiskMatrix = () => {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-forest-900">Risk Matrix Analysis</h1>
            <p className="text-muted-foreground">Scatter plot of Fraud Probability (X) vs Anomaly Score (Y). Bubble size represents credit volume.</p>

            <div className="grid grid-cols-1 gap-6">
                <Card className="h-[600px]">
                    <CardHeader>
                        <CardTitle>Portfolio Risk Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-full pb-12">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="Fraud Probability" unit="%" domain={[0, 100]} label={{ value: 'Fraud Probability', position: 'insideBottom', offset: -10 }} />
                                <YAxis type="number" dataKey="y" name="Anomaly Score" unit="%" domain={[0, 100]} label={{ value: 'Anomaly Score', angle: -90, position: 'insideLeft' }} />
                                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Credit Volume" unit="k" />
                                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Projects" data={riskData} fill="#8884d8">
                                    {riskData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.risk as keyof typeof COLORS]} />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RiskMatrix;
