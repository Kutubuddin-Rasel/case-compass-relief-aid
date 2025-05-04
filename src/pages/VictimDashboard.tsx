
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentList from '@/components/dashboard/AppointmentList';
import CaseList from '@/components/cases/CaseList';

// Import icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
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

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const VictimDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Check if user is authenticated and is a victim
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    
    if (!userType) {
      navigate('/login');
    } else if (userType === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  // Sidebar items for victim
  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      name: 'My Cases',
      href: '/cases',
      icon: <CaseIcon />,
    },
    {
      name: 'Appointments',
      href: '/appointments',
      icon: <AppointmentIcon />,
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: <DocumentIcon />,
    },
    {
      name: 'My Profile',
      href: '/profile',
      icon: <ProfileIcon />,
    },
  ];
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <DashboardLayout title="Dashboard" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Open Cases"
            value="3"
            description="Active cases being processed"
            className="border-l-4 border-l-blue-500"
          />
          <StatsCard
            title="Closed Cases"
            value="2"
            description="Successfully resolved"
            className="border-l-4 border-l-green-500"
          />
          <StatsCard
            title="Upcoming Appointments"
            value="3"
            description="Scheduled meetings"
            className="border-l-4 border-l-purple-500"
          />
          <StatsCard
            title="Recent Updates"
            value="5"
            description="Updates in the last week"
            className="border-l-4 border-l-amber-500"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AppointmentList />
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
            <div className="bg-white rounded-lg border p-4">
              <div className="space-y-4">
                <div className="border-l-2 border-healing-500 pl-4 py-1">
                  <p className="text-sm text-gray-500">May 3, 2025</p>
                  <p className="font-medium">Medical report has been uploaded</p>
                </div>
                <div className="border-l-2 border-healing-500 pl-4 py-1">
                  <p className="text-sm text-gray-500">May 1, 2025</p>
                  <p className="font-medium">Case status updated to "In Progress"</p>
                </div>
                <div className="border-l-2 border-healing-500 pl-4 py-1">
                  <p className="text-sm text-gray-500">April 29, 2025</p>
                  <p className="font-medium">Financial aid application approved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <CaseList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VictimDashboard;
