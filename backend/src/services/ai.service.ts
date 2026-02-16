interface AIAnalysisResult {
    esgAnalysis: {
        contradictionScore: number;
        flaggedKeywords: string[];
        sentiment: 'positive' | 'neutral' | 'negative';
    };
    anomalyDetection: {
        deviationPercentage: number;
        isFlagged: boolean;
        historicalVariance: number;
    };
    satelliteValidation: {
        landUseMatchScore: number; // 0-100
        vegetationIndex: number;
        status: 'MATCH' | 'MISMATCH' | 'INCONCLUSIVE';
    };
    riskScore: {
        fraudProbability: number; // 0-100
        greenwashingRisk: number; // 0-100
        overallRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    };
}

export const analyzeSubmission = async (data: any): Promise<AIAnalysisResult> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 1. ESG NLP Simulation
    const esgAnalysis = simulateESGAnalysis(data.description || "");

    // 2. Anomaly Detection Simulation
    const anomalyDetection = simulateAnomalyDetection(data.claimedCredits, data.historicalCredits || []);

    // 3. Satellite Validation Simulation
    const satelliteValidation = simulateSatelliteCheck(data.coordinates);

    // 4. Risk Scoring Engine
    const riskScore = calculateRiskScore(esgAnalysis, anomalyDetection, satelliteValidation);

    return {
        esgAnalysis,
        anomalyDetection,
        satelliteValidation,
        riskScore
    };
};

const simulateESGAnalysis = (text: string) => {
    const suspiciousKeywords = ["approximate", "estimate", "projected", "planned", "theoretical"];
    const foundKeywords = suspiciousKeywords.filter(keyword => text.toLowerCase().includes(keyword));

    // Simple heuristic: more suspicious keywords -> higher contradiction score
    const contradictionScore = Math.min(foundKeywords.length * 15, 100);

    return {
        contradictionScore,
        flaggedKeywords: foundKeywords,
        sentiment: contradictionScore > 50 ? 'negative' : 'neutral' as 'positive' | 'neutral' | 'negative'
    };
};

const simulateAnomalyDetection = (current: number, history: number[]) => {
    if (!history || history.length === 0) {
        return { deviationPercentage: 0, isFlagged: false, historicalVariance: 0 };
    }

    const avg = history.reduce((a, b) => a + b, 0) / history.length;
    const deviation = avg === 0 ? 0 : ((current - avg) / avg) * 100;

    // Cross-check energy usage (simulated)
    // In a real scenario, this would compare reported emissions vs grid energy consumption data
    const energyUsageMatch = Math.random() > 0.1; // 90% match rate

    return {
        deviationPercentage: parseFloat(deviation.toFixed(2)),
        isFlagged: deviation > 30 || deviation < -30 || !energyUsageMatch, // Flag if deviation > 30% or energy mismatch
        historicalVariance: parseFloat(Math.abs(current - avg).toFixed(2))
    };
};

const simulateSatelliteCheck = (coordinates: string) => {
    // Compare land usage claim
    // AI analyzes satellite imagery to verify if the area matches the reported project type (e.g. Forest vs Farm)
    const randomScore = Math.floor(Math.random() * (100 - 60 + 1) + 60); // 60-100 random score

    return {
        landUseMatchScore: randomScore,
        vegetationIndex: 0.75, // Mock NDVI (Normalized Difference Vegetation Index)
        status: randomScore > 80 ? 'MATCH' : (randomScore > 50 ? 'INCONCLUSIVE' : 'MISMATCH') as 'MATCH' | 'MISMATCH' | 'INCONCLUSIVE'
    };
};

const calculateRiskScore = (esg: any, anomaly: any, satellite: any) => {
    let fraudScore = 0;

    // Weightings
    fraudScore += (esg.contradictionScore * 0.3);
    fraudScore += (anomaly.isFlagged ? 40 : 10);
    fraudScore += ((100 - satellite.landUseMatchScore) * 0.3);

    fraudScore = Math.min(Math.max(fraudScore, 0), 100); // 0-100 clamp

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (fraudScore > 80) riskLevel = 'CRITICAL';
    else if (fraudScore > 50) riskLevel = 'HIGH';
    else if (fraudScore > 20) riskLevel = 'MEDIUM';

    return {
        fraudProbability: Math.floor(fraudScore),
        greenwashingRisk: Math.floor(fraudScore * 0.8), // Slightly lower than fraud
        overallRiskLevel: riskLevel
    };
};
