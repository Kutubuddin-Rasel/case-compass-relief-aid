
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CaseSummary from '@/components/cases/CaseSummary';
import CaseNotes from '@/components/cases/CaseNotes';
import CaseDocuments from '@/components/cases/CaseDocuments';
import { toast } from 'sonner';

// Import icons
import { 
  FileText, FileImage, MessageSquare, ClipboardList, 
  Users, Calendar, Bell, Settings, Home, FileCheck 
} from 'lucide-react';

// Mock case data
const mockCaseData = {
  'CS-2023-001': {
    id: 'CS-2023-001',
    title: 'Medical Treatment Support',
    status: 'open',
    victim: 'John Doe',
    description: 'Patient seeking support for ongoing medical treatment after acid attack',
    lastUpdated: '2025-05-01T14:30:00',
    type: 'medical',
    assignedStaff: 'Dr. Sarah Miller',
    openDate: '2025-03-15T10:00:00',
    documents: [
      { id: 'doc1', name: 'Medical Report.pdf', type: 'medical', uploadedAt: '2025-04-10T11:22:00', uploadedBy: 'Dr. Sarah Miller' },
      { id: 'doc2', name: 'Treatment Plan.pdf', type: 'medical', uploadedAt: '2025-04-15T09:45:00', uploadedBy: 'Dr. Sarah Miller' },
    ],
    notes: [
      { id: 'note1', author: 'Dr. Sarah Miller', content: 'Initial assessment completed. Patient requires specialized treatment for facial burns.', timestamp: '2025-03-15T14:30:00' },
      { id: 'note2', author: 'Nurse Johnson', content: 'First treatment session completed successfully. Patient showing signs of improvement.', timestamp: '2025-04-01T11:15:00' },
      { id: 'note3', author: 'Dr. Sarah Miller', content: 'Follow-up assessment shows positive progress. Continuing with treatment plan as scheduled.', timestamp: '2025-04-15T10:30:00' },
    ]
  },
  'CS-2023-002': {
    id: 'CS-2023-002',
    title: 'Legal Aid Application',
    status: 'in-progress',
    victim: 'Jane Smith',
    description: 'Legal assistance for court proceedings against attacker',
    lastUpdated: '2025-04-28T09:15:00',
    type: 'legal',
    assignedStaff: 'Atty. Robert Johnson',
    openDate: '2025-04-01T09:30:00',
    documents: [
      { id: 'doc3', name: 'Police Report.pdf', type: 'legal', uploadedAt: '2025-04-05T14:20:00', uploadedBy: 'Atty. Robert Johnson' },
      { id: 'doc4', name: 'Witness Statement.pdf', type: 'legal', uploadedAt: '2025-04-10T16:45:00', uploadedBy: 'Atty. Robert Johnson' },
    ],
    notes: [
      { id: 'note4', author: 'Atty. Robert Johnson', content: 'Initial consultation completed. Case has merit for legal proceedings.', timestamp: '2025-04-01T10:45:00' },
      { id: 'note5', author: 'Atty. Robert Johnson', content: 'Filed initial paperwork with the court. Awaiting court date.', timestamp: '2025-04-15T11:30:00' },
    ]
  }
};

interface CaseDetailProps {
  isAdmin?: boolean;
}

const CaseDetail = ({ isAdmin = false }: CaseDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('summary');
  
  useEffect(() => {
    // In a real app, fetch case data from API
    if (id && mockCaseData[id as keyof typeof mockCaseData]) {
      setCaseData(mockCaseData[id as keyof typeof mockCaseData]);
      setLoading(false);
    } else {
      // Case not found
      toast.error('Case not found');
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    }
  }, [id, navigate, isAdmin]);
  
  // Get the sidebar items based on user type
  const getSidebarItems = () => {
    if (isAdmin) {
      return [
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
    } else {
      return [
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
    }
  };
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  const handleStatusChange = (newStatus: string) => {
    setCaseData({ ...caseData, status: newStatus });
    toast.success(`Case status updated to ${newStatus}`);
  };
  
  const handleCloseCase = () => {
    setCaseData({ ...caseData, status: 'closed' });
    toast.success('Case has been closed');
  };
  
  return (
    <DashboardLayout 
      title={`Case: ${caseData.id}`}
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{caseData.title}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant={
                caseData.status === 'open' ? 'default' : 
                caseData.status === 'in-progress' ? 'outline' : 
                'secondary'
              }>
                {caseData.status.toUpperCase()}
              </Badge>
              <span className="text-sm text-gray-500">
                Opened: {new Date(caseData.openDate).toLocaleDateString()}
              </span>
              {caseData.status === 'closed' && (
                <span className="text-sm text-gray-500">
                  Closed: {new Date().toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          
          {isAdmin && (
            <div className="flex space-x-4 mt-4 md:mt-0">
              {caseData.status !== 'closed' && (
                <>
                  <div>
                    <select 
                      className="rounded border p-2 bg-white"
                      value={caseData.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={handleCloseCase}
                  >
                    Close Case
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="summary">
              <ClipboardList className="w-4 h-4 mr-2" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="notes">
              <MessageSquare className="w-4 h-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileCheck className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <CaseSummary caseData={caseData} isAdmin={isAdmin} />
          </TabsContent>
          
          <TabsContent value="notes">
            <CaseNotes notes={caseData.notes} isAdmin={isAdmin} caseId={caseData.id} />
          </TabsContent>
          
          <TabsContent value="documents">
            <CaseDocuments documents={caseData.documents} isAdmin={isAdmin} caseId={caseData.id} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CaseDetail;
