
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Users, Calendar, Settings, Bell, Search, Plus, Filter } from 'lucide-react';

// Define types
interface Case {
  id: string;
  title: string;
  victim: string;
  status: string;
  type: string;
  lastUpdated: string;
  assignedTo: string;
}

const AdminCases = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Mock data for cases
  const mockCases: Case[] = [
    {
      id: 'CS-2023-001',
      title: 'Emergency Housing Assistance',
      victim: 'John Doe',
      status: 'active',
      type: 'housing',
      lastUpdated: '2025-05-01T10:30:00',
      assignedTo: 'Sarah Johnson',
    },
    {
      id: 'CS-2023-002',
      title: 'Medical Support Request',
      victim: 'Jane Smith',
      status: 'pending',
      type: 'medical',
      lastUpdated: '2025-04-28T14:15:00',
      assignedTo: 'Dr. Michael Chen',
    },
    {
      id: 'CS-2023-003',
      title: 'Legal Assistance for Domestic Violence',
      victim: 'Emily Wilson',
      status: 'active',
      type: 'legal',
      lastUpdated: '2025-04-25T09:45:00',
      assignedTo: 'Robert Martinez, Esq.',
    },
    {
      id: 'CS-2023-004',
      title: 'Child Support Services',
      victim: 'Maria Garcia',
      status: 'completed',
      type: 'family',
      lastUpdated: '2025-04-15T11:20:00',
      assignedTo: 'Jennifer Lee',
    },
    {
      id: 'CS-2023-005',
      title: 'Financial Aid Application',
      victim: 'David Brown',
      status: 'active',
      type: 'financial',
      lastUpdated: '2025-04-30T16:00:00',
      assignedTo: 'Amanda Taylor',
    },
  ];
  
  // Filtering logic
  const filteredCases = mockCases.filter((caseItem) => {
    const matchesSearch = 
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.victim.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    const matchesType = typeFilter === 'all' || caseItem.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Get sidebar items
  const getSidebarItems = () => [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <FileText />,
    },
    {
      name: 'Intake',
      href: '/admin/intake',
      icon: <Plus />,
    },
    {
      name: 'Victims',
      href: '/admin/victims',
      icon: <Users />,
    },
    {
      name: 'Cases',
      href: '/admin/cases',
      icon: <FileText />,
    },
    {
      name: 'Appointments',
      href: '/admin/appointments',
      icon: <Calendar />,
    },
    {
      name: 'Notifications',
      href: '/admin/notifications',
      icon: <Bell />,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings />,
    },
  ];
  
  // Case status badge color mapping
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout title="Case Management" sidebarItems={getSidebarItems()}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Cases</h1>
            <p className="text-gray-500">Manage and track relief aid cases</p>
          </div>
          <Button onClick={() => navigate('/admin/intake')} className="bg-healing-600 hover:bg-healing-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Case
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Case Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search cases..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>All Cases ({filteredCases.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/cases/${caseItem.id}`)}
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                        <p className="font-medium text-gray-900">{caseItem.title}</p>
                        <Badge variant="outline">{caseItem.id}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                        <p>Victim: {caseItem.victim}</p>
                        <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-300"></div>
                        <p>Assigned to: {caseItem.assignedTo}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <Badge className={getStatusBadgeColor(caseItem.status)}>
                        {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">{caseItem.type}</Badge>
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        Updated {new Date(caseItem.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No cases found matching your filters</p>
                  <Button variant="outline" className="mt-2" onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCases;
