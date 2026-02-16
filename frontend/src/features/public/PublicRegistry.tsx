import { useEffect, useState } from 'react';
import { Search, MapPin, Leaf, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import api from '../../services/api';

const PublicRegistry = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects/public');
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch public projects", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.owner?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-forest-900 text-white py-16 px-6 text-center">
                <h1 className="text-4xl font-bold font-heading mb-4">Verified Carbon Registry</h1>
                <p className="text-forest-100 max-w-2xl mx-auto mb-8">
                    Explore transparent, government-verified carbon credit projects. track real-time impact and ensure authenticity.
                </p>
                <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input
                        placeholder="Search projects, companies, or locations..."
                        className="pl-10 h-12 bg-white text-slate-900 border-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto py-12 px-6">
                {loading ? (
                    <div className="text-center py-20">Loading registry data...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <Card key={project._id} className="hover:shadow-lg transition-all border-t-4 border-t-green-600">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                            Verified
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">{new Date(project.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                    <CardTitle className="text-xl line-clamp-1" title={project.title}>{project.title}</CardTitle>
                                    <p className="text-sm text-forest-600 font-medium">{project.owner?.companyName}</p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>

                                    <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-3 rounded-lg">
                                        <div className="flex items-center text-slate-600">
                                            <Leaf className="h-4 w-4 mr-2 text-green-600" />
                                            <span>{project.carbonTons.toLocaleString()} Tons</span>
                                        </div>
                                        <div className="flex items-center text-slate-600">
                                            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                                            <span className="truncate" title={project.location}>{project.location}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t pt-4">
                                    <Button variant="ghost" className="w-full text-forest-600 hover:text-forest-700 hover:bg-forest-50 group">
                                        View Full Verification Report <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                {!loading && filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <Leaf className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No verified projects found</h3>
                        <p className="text-slate-500">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicRegistry;
