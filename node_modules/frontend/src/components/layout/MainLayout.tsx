import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <ShieldCheck className="h-6 w-6" />
                        <span>GreenGuard AI</span>
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">Verify Company</Link>
                        <Link to="/complaint" className="text-sm font-medium hover:text-primary transition-colors">File Complaint</Link>
                        <Link to="/register" className="text-sm font-medium hover:text-primary transition-colors">Register</Link>
                        <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Login</Link>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t py-6 text-center text-sm text-muted-foreground">
                © 2026 National Carbon Registry. Government-Grade AI Oversight.
            </footer>
        </div>
    );
};

export default MainLayout;
