
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const IntakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </svg>
);

const VictimsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const AppointmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const NotificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3Z" />
    <path d="M8 17v1a4 4 0 0 0 8 0v-1" />
  </svg>
);

const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M12 2v2" />
    <path d="M12 22v-2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M22 12h-2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Check if user is authenticated and is an admin
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    
    if (!userType) {
      navigate('/login');
    } else if (userType !== 'admin') {
      navigate('/dashboard');
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  // Sidebar items for admin
  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <DashboardIcon />,
    },
    {
      name: 'Intake',
      href: '/admin/intake',
      icon: <IntakeIcon />,
    },
    {
      name: 'Victims',
      href: '/admin/victims',
      icon: <VictimsIcon />,
    },
    {
      name: 'Cases',
      href: '/admin/cases',
      icon: <CaseIcon />,
    },
    {
      name: 'Appointments',
      href: '/admin/appointments',
      icon: <AppointmentIcon />,
    },
    {
      name: 'Notifications',
      href: '/admin/notifications',
      icon: <NotificationIcon />,
    },
    {
      name: 'Reports',
      href: '/admin/reports',
      icon: <ReportIcon />,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <SettingsIcon />,
    },
  ];
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <DashboardLayout title="Admin Dashboard" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Victims"
            value="124"
            trend="up"
            trendValue="8% from last month"
            className="border-l-4 border-l-blue-500"
          />
          <StatsCard
            title="Open Cases"
            value="37"
            trend="up"
            trendValue="12% from last month"
            className="border-l-4 border-l-amber-500"
          />
          <StatsCard
            title="Pending Approvals"
            value="9"
            description="Require immediate attention"
            className="border-l-4 border-l-red-500"
          />
          <StatsCard
            title="Upcoming Appointments"
            value="18"
            description="Next 7 days"
            className="border-l-4 border-l-green-500"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => navigate("/admin/intake")}>
                <IntakeIcon />
                <span className="mt-2">Intake New Victim</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => navigate("/admin/cases/new")}>
                <CaseIcon />
                <span className="mt-2">Create New Case</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => navigate("/admin/appointments")}>
                <AppointmentIcon />
                <span className="mt-2">Schedule Appointment</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col" onClick={() => navigate("/admin/reports")}>
                <ReportIcon />
                <span className="mt-2">Generate Report</span>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">New victim registered</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Case #CS-2023-042 updated</p>
                    <p className="text-xs text-gray-500">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Appointment rescheduled</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Document uploaded</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2 mr-2"></div>
                  <div>
                    <p className="text-sm font-medium">Financial aid request pending review</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <AppointmentList isAdmin={true} />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
