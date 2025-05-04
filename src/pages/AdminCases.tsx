
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Bell, 
  Settings, 
  ClipboardList, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Filter 
} from 'lucide-react';

// Mock cases data
const mockCases = [
  {
    id: 'CS-2025-001',
    title: 'Medical Treatment Aid',
    victimName: 'John Doe',
    victimId: 'v001',
    dateOpened: '2025-02-15T10:30:00',
    status: 'open',
    priority: 'high',
    caseWorker: 'Emma Johnson',
    lastUpdated: '2025-04-28T14:30:00'
  },
  {
    id: 'CS-2025-002',
    title: 'Legal Support Request',
    victimName: 'Jane Smith',
    victimId: 'v002',
    dateOpened: '2025-03-05T09:15:00',
    status: 'in-progress',
    priority: 'medium',
    caseWorker: 'Michael Chen',
    lastUpdated: '2025-04-25T11:45:00'
  },
  {
    id: 'CS-2025-003',
    title: 'Housing Assistance',
    victimName: 'Robert Johnson',
    victimId: 'v003',
    dateOpened: '2025-03-10T13:45:00',
    status: 'closed',
    priority: 'low',
    caseWorker: 'Sarah Williams',
    lastUpdated: '2025-04-10T16:20:00'
  },
  {
    id: 'CS-2025-004',
    title: 'Psychological Support',
    victimName: 'Sarah Williams',
    victimId: 'v004',
    dateOpened: '2025-03-18T11:00:00',
    status: 'open',
    priority: 'high',
    caseWorker: 'David Thompson',
    lastUpdated: '2025-04-27T09:10:00'
  },
  {
    id: 'CS-2025-005',
    title: 'Financial Support Application',
    victimName: 'Michael Brown',
    victimId: 'v005',
    dateOpened: '2025-04-02T15:30:00',
    status: 'in-progress',
    priority: 'medium',
    caseWorker: 'Lisa Garcia',
    lastUpdated: '2025-04-22T14:05:00'
  }
];

const AdminCases = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState(mockCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Get the sidebar items for admin
  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <Home />,
    },
    {
      name: 'Intake',
      href: '/admin/intake',
      icon: <Users />,
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
      name: 'Reports',
      href: '/admin/reports',
      icon: <ClipboardList />,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings />,
    },
  ];

  const handleStatusChange = (caseId: string, newStatus: string) => {
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, status: newStatus } : c
    ));
    
    toast.success(`Case status updated to ${newStatus}`);
  };

  const handleDeleteCase = (caseId: string) => {
    setCases(cases.filter(c => c.id !== caseId));
    toast.success('Case deleted successfully');
  };

  const filteredCases = cases.filter(c => {
    // Filter by search term
    const matchesSearch = 
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.victimName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    
    // Filter by priority
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-500">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-500">In Progress</Badge>;
      case 'closed':
        return <Badge variant="outline" className="text-gray-500">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout title="Case Management" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search cases..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="p-2 border rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                className="p-2 border rounded-md"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          <Button onClick={() => navigate('/admin/cases/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Case
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Cases ({filteredCases.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Case ID</th>
                    <th className="px-4 py-3 text-left">Case Title</th>
                    <th className="px-4 py-3 text-left">Victim</th>
                    <th className="px-4 py-3 text-left">Date Opened</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Priority</th>
                    <th className="px-4 py-3 text-left">Case Worker</th>
                    <th className="px-4 py-3 text-left">Last Updated</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCases.length > 0 ? (
                    filteredCases.map((caseItem) => (
                      <tr key={caseItem.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{caseItem.id}</td>
                        <td className="px-4 py-3">{caseItem.title}</td>
                        <td className="px-4 py-3">
                          <div>{caseItem.victimName}</div>
                          <div className="text-xs text-gray-500">ID: {caseItem.victimId}</div>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(caseItem.dateOpened).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(caseItem.status)}
                        </td>
                        <td className="px-4 py-3">
                          {getPriorityBadge(caseItem.priority)}
                        </td>
                        <td className="px-4 py-3">{caseItem.caseWorker}</td>
                        <td className="px-4 py-3">
                          {new Date(caseItem.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/cases/${caseItem.id}`)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/cases/${caseItem.id}/edit`)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteCase(caseItem.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center">
                        <div className="text-gray-500">No cases found matching your criteria</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminCases;
