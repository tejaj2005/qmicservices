import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
    LayoutDashboard,
    FileText,
    AlertTriangle,
    LogOut,
    ShieldCheck,
    Search,
    Bell
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
                    <div className="flex gap-2">
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                                    <span className="sr-only">Notifications</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="max-h-[300px] overflow-y-auto">
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                        <div className="flex justify-between w-full">
                                            <span className="font-medium text-xs">System Analysis</span>
                                            <span className="text-[10px] text-muted-foreground">Just now</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">AI verification algorithms updated for forest biomass.</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                        <div className="flex justify-between w-full">
                                            <span className="font-medium text-xs">Policy Alert</span>
                                            <span className="text-[10px] text-muted-foreground">2h ago</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">New compliance standards for Q3 2026 released.</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                        <div className="flex justify-between w-full">
                                            <span className="font-medium text-xs">Maintenance</span>
                                            <span className="text-[10px] text-muted-foreground">1d ago</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Scheduled downtime this Sunday 2 AM - 4 AM.</p>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
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
