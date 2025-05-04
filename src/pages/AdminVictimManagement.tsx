
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Home, Users, FileText, Calendar, Bell, Settings, ClipboardList, Search, Plus, Edit, Eye } from 'lucide-react';

// Mock victims data
const mockVictims = [
  {
    id: 'v001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    dateAdded: '2025-03-15T10:30:00',
    status: 'active',
    casesCount: 2
  },
  {
    id: 'v002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    dateAdded: '2025-03-20T14:15:00',
    status: 'active',
    casesCount: 1
  },
  {
    id: 'v003',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 345-6789',
    dateAdded: '2025-03-25T09:45:00',
    status: 'inactive',
    casesCount: 0
  },
  {
    id: 'v004',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '(555) 456-7890',
    dateAdded: '2025-04-01T11:20:00',
    status: 'active',
    casesCount: 3
  },
  {
    id: 'v005',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 567-8901',
    dateAdded: '2025-04-05T13:10:00',
    status: 'pending',
    casesCount: 1
  }
];

const AdminVictimManagement = () => {
  const navigate = useNavigate();
  const [victims, setVictims] = useState(mockVictims);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const handleStatusChange = (victimId: string, newStatus: string) => {
    setVictims(victims.map(victim => 
      victim.id === victimId ? { ...victim, status: newStatus } : victim
    ));
    
    toast.success(`Victim status updated to ${newStatus}`);
  };

  const filteredVictims = victims.filter(victim => {
    // Filter by search term
    const matchesSearch = 
      victim.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      victim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.phone.includes(searchTerm);
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || victim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Victim Management" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search victims..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="p-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <Button onClick={() => navigate('/admin/intake')}>
            <Plus className="w-4 h-4 mr-2" />
            New Victim Intake
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Victims ({filteredVictims.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Date Added</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Cases</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredVictims.length > 0 ? (
                    filteredVictims.map((victim) => (
                      <tr key={victim.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{victim.name}</div>
                          <div className="text-xs text-gray-500">ID: {victim.id}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div>{victim.email}</div>
                          <div>{victim.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(victim.dateAdded).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={
                            victim.status === 'active' ? 'default' :
                            victim.status === 'inactive' ? 'destructive' :
                            'outline'
                          }>
                            {victim.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {victim.casesCount} {victim.casesCount === 1 ? 'case' : 'cases'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/victims/${victim.id}`)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/victims/${victim.id}/edit`)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            
                            {victim.status === 'active' ? (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleStatusChange(victim.id, 'inactive')}
                              >
                                Deactivate
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-green-500 hover:text-green-700"
                                onClick={() => handleStatusChange(victim.id, 'active')}
                              >
                                Activate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center">
                        <div className="text-gray-500">No victims found matching your criteria</div>
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

export default AdminVictimManagement;
