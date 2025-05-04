
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Calendar, Settings, Bell, Search, Plus, Filter, FileText as FileIcon } from 'lucide-react';

// Define types
interface Victim {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  casesCount: number;
  registeredDate: string;
  lastActivity: string;
}

const AdminVictimManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock data for victims
  const mockVictims: Victim[] = [
    {
      id: 'VT-2023-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      status: 'active',
      casesCount: 3,
      registeredDate: '2023-09-15',
      lastActivity: '2025-05-01'
    },
    {
      id: 'VT-2023-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      status: 'active',
      casesCount: 2,
      registeredDate: '2023-10-10',
      lastActivity: '2025-04-28'
    },
    {
      id: 'VT-2023-003',
      name: 'Emily Wilson',
      email: 'emily.w@example.com',
      phone: '(555) 456-7890',
      status: 'inactive',
      casesCount: 1,
      registeredDate: '2023-11-05',
      lastActivity: '2025-03-15'
    },
    {
      id: 'VT-2023-004',
      name: 'Maria Garcia',
      email: 'maria.g@example.com',
      phone: '(555) 222-3333',
      status: 'active',
      casesCount: 4,
      registeredDate: '2023-08-20',
      lastActivity: '2025-05-02'
    },
    {
      id: 'VT-2023-005',
      name: 'David Brown',
      email: 'david.b@example.com',
      phone: '(555) 111-2222',
      status: 'pending',
      casesCount: 1,
      registeredDate: '2025-04-30',
      lastActivity: '2025-04-30'
    }
  ];
  
  // Filtering logic
  const filteredVictims = mockVictims.filter((victim) => {
    const matchesSearch = 
      victim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      victim.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || victim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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
      icon: <FileIcon />,
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
  
  // Status badge color mapping
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout title="Victim Management" sidebarItems={getSidebarItems()}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Victims</h1>
            <p className="text-gray-500">Manage victim profiles and cases</p>
          </div>
          <Button onClick={() => navigate('/admin/intake')} className="bg-healing-600 hover:bg-healing-700">
            <Plus className="w-4 h-4 mr-2" />
            Register New Victim
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by name, email or ID..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Victim Registry ({filteredVictims.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredVictims.length > 0 ? (
                filteredVictims.map((victim) => (
                  <div
                    key={victim.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/admin/victims/${victim.id}`)}
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 sm:mb-0">
                        <p className="font-medium text-gray-900">{victim.name}</p>
                        <Badge variant="outline">{victim.id}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                        <p>{victim.email}</p>
                        <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-300"></div>
                        <p>{victim.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
                      <Badge className={getStatusBadgeColor(victim.status)}>
                        {victim.status.charAt(0).toUpperCase() + victim.status.slice(1)}
                      </Badge>
                      <div className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                        {victim.casesCount} {victim.casesCount === 1 ? 'case' : 'cases'}
                      </div>
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        Last active: {new Date(victim.lastActivity).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No victims found matching your search</p>
                  <Button variant="outline" className="mt-2" onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
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

export default AdminVictimManagement;
