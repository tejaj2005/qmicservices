import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
    LayoutDashboard,
    FileText,
    AlertTriangle,
    LogOut,
    ShieldCheck,
    Search
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const DashboardLayout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = user?.role === 'GOV_ADMIN' ? [
        { label: 'Overview', path: '/gov', icon: LayoutDashboard },
        { label: 'Investigations', path: '/gov/investigations', icon: Search },
        { label: 'Risk Map', path: '/gov/risk-map', icon: AlertTriangle },
    ] : [
        { label: 'Overview', path: '/company', icon: LayoutDashboard },
        { label: 'My Claims', path: '/company/claims', icon: FileText },
        { label: 'New Submission', path: '/company/submit', icon: ShieldCheck },
    ];

    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r flex flex-col fixed inset-y-0 z-10">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                        <ShieldCheck className="h-5 w-5" />
                        <span>GreenGuard</span>
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                location.pathname === item.path
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t">
                    <div className="mb-4 px-3">
                        <p className="text-sm font-semibold">{user?.companyName || 'Government Agent'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
