
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Home, FileText, Calendar, Users, Bell, Settings, ClipboardList, FileImage, Plus, FileCheck, Edit, Download, Search } from 'lucide-react';

// Mock medical records data
const mockMedicalRecords = [
  {
    id: 'med-rec-001',
    title: 'Initial Medical Assessment',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Miller',
    facility: 'Central Hospital',
    date: '2025-03-15T10:00:00',
    type: 'assessment',
    status: 'complete',
    notes: 'Patient presented with facial burns from acid attack. Second-degree burns on 15% of face. Treatment plan initiated.',
    caseId: 'CS-2023-001'
  },
  {
    id: 'med-rec-002',
    title: 'First Treatment Session',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Miller',
    facility: 'Central Hospital',
    date: '2025-04-01T11:15:00',
    type: 'treatment',
    status: 'complete',
    notes: 'First debridement performed. Patient tolerated procedure well. Prescribed antibiotics and pain management.',
    caseId: 'CS-2023-001'
  },
  {
    id: 'med-rec-003',
    title: 'Follow-up Assessment',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Miller',
    facility: 'Central Hospital',
    date: '2025-04-15T10:30:00',
    type: 'follow-up',
    status: 'complete',
    notes: 'Healing progressing well. Scheduled for skin graft evaluation next month.',
    caseId: 'CS-2023-001'
  },
  {
    id: 'med-rec-004',
    title: 'Psychological Evaluation',
    patientName: 'John Doe',
    doctorName: 'Dr. Michael Brown',
    facility: 'Central Hospital - Mental Health Dept.',
    date: '2025-04-22T14:00:00',
    type: 'psychological',
    status: 'complete',
    notes: 'Patient showing signs of PTSD and anxiety. Recommended therapy sessions twice weekly.',
    caseId: 'CS-2023-001'
  }
];

interface MedicalRecordsProps {
  isAdmin?: boolean;
}

const MedicalRecords = ({ isAdmin = false }: MedicalRecordsProps) => {
  const navigate = useNavigate();
  const [records, setRecords] = useState(mockMedicalRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({
    id: '',
    title: '',
    patientName: 'John Doe', // Default for new records
    doctorName: '',
    facility: '',
    date: '',
    type: 'assessment',
    status: 'complete',
    notes: '',
    caseId: 'CS-2023-001' // Default for new records
  });
  
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
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentRecord.id) {
      // Update existing record
      setRecords(records.map(record => 
        record.id === currentRecord.id ? currentRecord : record
      ));
      toast.success('Medical record updated successfully');
    } else {
      // Add new record
      const newRecord = {
        ...currentRecord,
        id: `med-rec-${Date.now()}`,
        date: currentRecord.date || new Date().toISOString().split('T')[0]
      };
      setRecords([...records, newRecord]);
      toast.success('Medical record added successfully');
    }
    
    // Reset form
    setIsFormOpen(false);
    setCurrentRecord({
      id: '',
      title: '',
      patientName: 'John Doe',
      doctorName: '',
      facility: '',
      date: '',
      type: 'assessment',
      status: 'complete',
      notes: '',
      caseId: 'CS-2023-001'
    });
  };
  
  const handleEdit = (record: typeof currentRecord) => {
    setCurrentRecord(record);
    setIsFormOpen(true);
  };
  
  const handleDownload = (record: { id: string; title: string }) => {
    // In a real app, this would trigger a file download
    toast.success(`Downloading record: ${record.title}`);
  };
  
  const filteredRecords = records.filter(record => 
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.facility.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout
      title="Medical Records"
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search records..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isAdmin && (
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Medical Record
            </Button>
          )}
        </div>
        
        {isFormOpen && isAdmin && (
          <Card className="mb-6">
            <form onSubmit={handleFormSubmit}>
              <CardHeader>
                <CardTitle>{currentRecord.id ? 'Edit Medical Record' : 'New Medical Record'}</CardTitle>
                <CardDescription>Enter the details for this medical record</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      value={currentRecord.title} 
                      onChange={(e) => setCurrentRecord({...currentRecord, title: e.target.value})}
                      placeholder="Record title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient</label>
                    <Input 
                      value={currentRecord.patientName} 
                      onChange={(e) => setCurrentRecord({...currentRecord, patientName: e.target.value})}
                      placeholder="Patient name"
                      required
                      disabled
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Doctor/Provider</label>
                    <Input 
                      value={currentRecord.doctorName} 
                      onChange={(e) => setCurrentRecord({...currentRecord, doctorName: e.target.value})}
                      placeholder="Doctor name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Facility</label>
                    <Input 
                      value={currentRecord.facility} 
                      onChange={(e) => setCurrentRecord({...currentRecord, facility: e.target.value})}
                      placeholder="Facility name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input 
                      type="date"
                      value={currentRecord.date ? new Date(currentRecord.date).toISOString().split('T')[0] : ''}
                      onChange={(e) => setCurrentRecord({...currentRecord, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={currentRecord.type}
                      onChange={(e) => setCurrentRecord({...currentRecord, type: e.target.value})}
                      required
                    >
                      <option value="assessment">Assessment</option>
                      <option value="treatment">Treatment</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="psychological">Psychological</option>
                      <option value="surgical">Surgical</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea 
                      value={currentRecord.notes} 
                      onChange={(e) => setCurrentRecord({...currentRecord, notes: e.target.value})}
                      placeholder="Medical notes"
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentRecord.id ? 'Update Record' : 'Save Record'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{record.title}</CardTitle>
                    <Badge variant={
                      record.status === 'complete' ? 'default' : 
                      record.status === 'pending' ? 'outline' : 
                      'secondary'
                    }>
                      {record.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription>
                    {new Date(record.date).toLocaleDateString()} • {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Patient:</span>
                      <span className="font-medium">{record.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Doctor/Provider:</span>
                      <span className="font-medium">{record.doctorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Facility:</span>
                      <span className="font-medium">{record.facility}</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-gray-500">Notes:</span>
                      <p className="mt-1 whitespace-pre-wrap">{record.notes}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(record)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    
                    {isAdmin && (
                      <Button variant="outline" size="sm" onClick={() => handleEdit(record)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border rounded-md bg-white">
            <FileCheck className="mx-auto h-8 w-8 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No medical records</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'No records matching your search criteria.' : 'No medical records have been added yet.'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecords;
