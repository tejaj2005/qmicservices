import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import api from '../../services/api';

type ActivityLog = {
    _id: string;
    user: { email: string; companyName?: string };
    action: string;
    details: string;
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    createdAt: string;
};

const ActivityFeed = () => {
    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/admin/activity');
                setLogs(response.data);
            } catch (error) {
                console.error('Failed to fetch activity logs', error);
                // Fallback for demo if API fails
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) return <div className="text-sm text-muted-foreground p-4">Loading activity...</div>;

    return (
        <Card className="h-[400px] flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Live Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[320px] px-4">
                    <div className="space-y-4 pt-2">
                        {logs.map((log) => (
                            <div key={log._id} className="flex items-start gap-4 text-sm border-b pb-3 last:border-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className={
                                        log.severity === 'CRITICAL' ? 'bg-red-500 text-white' :
                                            log.severity === 'WARNING' ? 'bg-yellow-500 text-black' :
                                                'bg-primary/10 text-primary'
                                    }>
                                        {log.user?.companyName?.[0] || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="font-semibold flex items-center gap-2">
                                        {log.user?.companyName || log.user?.email}
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${log.severity === 'CRITICAL' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                            log.severity === 'WARNING' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-muted text-muted-foreground'
                                            }`}>
                                            {log.action}
                                        </span>
                                    </div>
                                    <div className="text-muted-foreground">{log.details}</div>
                                    <div className="text-xs text-muted-foreground/60">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ActivityFeed;
