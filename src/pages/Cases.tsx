
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CaseList from '@/components/cases/CaseList';
import { Button } from '@/components/ui/button';
import { FileText, Home, Calendar, FileImage, Users } from 'lucide-react';

const Cases = () => {
  const navigate = useNavigate();
  
  // Sidebar items for victim
  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home />,
    },
    {
      name: 'My Cases',
      href: '/cases',
      icon: <FileText />,
    },
    {
      name: 'Appointments',
      href: '/appointments',
      icon: <Calendar />,
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: <FileImage />,
    },
    {
      name: 'My Profile',
      href: '/profile',
      icon: <Users />,
    },
  ];
  
  return (
    <DashboardLayout title="My Cases" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">My Cases</h1>
          <Button onClick={() => navigate('/appointments/request')} className="bg-healing-600 hover:bg-healing-700">
            Request Support
          </Button>
        </div>
        
        <CaseList />
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
          <h3 className="text-lg font-medium mb-2">Need assistance with a new case?</h3>
          <p className="mb-4">
            If you're experiencing distress or need immediate support, please don't hesitate to reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => navigate('/appointments/request')}>
              Schedule a Consultation
            </Button>
            <Button variant="outline" onClick={() => window.open('tel:+123456789')}>
              Call Helpline
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cases;
