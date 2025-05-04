
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Home, FileText, Calendar, Users, Bell, Settings, ClipboardList, FileImage, 
  FileCheck, Check, Download, Upload, Search, Eye, Plus
} from 'lucide-react';

// Mock consent forms data
const mockConsentForms = [
  {
    id: 'consent1',
    title: 'Medical Treatment Consent',
    description: 'Consent for medical treatment procedures',
    status: 'signed',
    signedDate: '2025-03-18T14:30:00',
    version: '1.1',
    createdDate: '2025-03-15T10:00:00',
    expiryDate: '2026-03-15T10:00:00',
    victimId: 'victim1',
    victimName: 'John Doe',
    requiredBy: 'Central Hospital'
  },
  {
    id: 'consent2',
    title: 'Information Release Authorization',
    description: 'Authorization to release medical information',
    status: 'pending',
    signedDate: '',
    version: '2.0',
    createdDate: '2025-04-10T09:15:00',
    expiryDate: '2026-04-10T09:15:00',
    victimId: 'victim1',
    victimName: 'John Doe',
    requiredBy: 'Legal Aid Office'
  },
  {
    id: 'consent3',
    title: 'Photography Authorization',
    description: 'Consent for medical photography for treatment records',
    status: 'signed',
    signedDate: '2025-04-05T11:45:00',
    version: '1.0',
    createdDate: '2025-04-01T13:30:00',
    expiryDate: '2026-04-01T13:30:00',
    victimId: 'victim1',
    victimName: 'John Doe',
    requiredBy: 'Central Hospital'
  },
  {
    id: 'consent4',
    title: 'Medical Research Participation',
    description: 'Consent to participate in research study',
    status: 'expired',
    signedDate: '2024-01-15T10:30:00',
    version: '1.2',
    createdDate: '2024-01-10T09:00:00',
    expiryDate: '2025-01-10T09:00:00',
    victimId: 'victim1',
    victimName: 'John Doe',
    requiredBy: 'Research Institute'
  }
];

interface ConsentFormsProps {
  isAdmin?: boolean;
}

const ConsentForms = ({ isAdmin = false }: ConsentFormsProps) => {
  const [consentForms, setConsentForms] = useState(mockConsentForms);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [newForm, setNewForm] = useState({
    title: '',
    description: '',
    version: '1.0',
    expiryDate: '',
    requiredBy: '',
    file: null
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
    
    const form = {
      id: `consent${Date.now()}`,
      title: newForm.title,
      description: newForm.description,
      status: 'pending',
      signedDate: '',
      version: newForm.version,
      createdDate: new Date().toISOString(),
      expiryDate: newForm.expiryDate,
      victimId: 'victim1',
      victimName: 'John Doe',
      requiredBy: newForm.requiredBy
    };
    
    setConsentForms([...consentForms, form]);
    setIsFormOpen(false);
    setNewForm({
      title: '',
      description: '',
      version: '1.0',
      expiryDate: '',
      requiredBy: '',
      file: null
    });
    
    toast.success('Consent form uploaded successfully');
  };
  
  const handleSignForm = (formId: string) => {
    setConsentForms(consentForms.map(form => 
      form.id === formId ? { ...form, status: 'signed', signedDate: new Date().toISOString() } : form
    ));
    toast.success('Form signed successfully');
  };
  
  const handleViewForm = (form: any) => {
    setSelectedForm(form);
  };
  
  const closeViewForm = () => {
    setSelectedForm(null);
  };
  
  const handleDownload = (form: any) => {
    toast.success(`Downloading ${form.title}`);
  };
  
  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'signed':
        return <Badge className="bg-green-100 text-green-800">Signed</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredForms = consentForms.filter(form => 
    form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.requiredBy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout
      title="Consent Forms"
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search forms..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isAdmin && (
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Consent Form
            </Button>
          )}
        </div>
        
        {isFormOpen && isAdmin && (
          <Card className="mb-6">
            <form onSubmit={handleFormSubmit}>
              <CardHeader>
                <CardTitle>Upload Consent Form</CardTitle>
                <CardDescription>Add a new consent form to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      value={newForm.title}
                      onChange={(e) => setNewForm({...newForm, title: e.target.value})}
                      placeholder="Form title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Version</label>
                    <Input 
                      value={newForm.version}
                      onChange={(e) => setNewForm({...newForm, version: e.target.value})}
                      placeholder="e.g., 1.0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Required By</label>
                    <Input 
                      value={newForm.requiredBy}
                      onChange={(e) => setNewForm({...newForm, requiredBy: e.target.value})}
                      placeholder="e.g., Hospital, Legal Aid"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input 
                      type="date"
                      value={newForm.expiryDate}
                      onChange={(e) => setNewForm({...newForm, expiryDate: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      value={newForm.description}
                      onChange={(e) => setNewForm({...newForm, description: e.target.value})}
                      placeholder="Brief description of the form"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Form File</label>
                    <Input 
                      type="file"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setNewForm({...newForm, file: e.target.files[0]});
                        }
                      }}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Upload Form
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        
        {selectedForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedForm.title}</CardTitle>
                    <CardDescription>Version {selectedForm.version} • {selectedForm.status === 'signed' ? 'Signed' : 'Unsigned'}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={closeViewForm}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created:</span>
                    <span>{formatDate(selectedForm.createdDate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expires:</span>
                    <span>{formatDate(selectedForm.expiryDate)}</span>
                  </div>
                  {selectedForm.signedDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Signed:</span>
                      <span>{formatDate(selectedForm.signedDate)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Required By:</span>
                    <span>{selectedForm.requiredBy}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p>{selectedForm.description}</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">Form Content</h3>
                    <div className="bg-gray-100 p-4 rounded-md min-h-[200px]">
                      <p className="text-gray-600 text-center">
                        [Form content would be displayed here in a real application]
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => handleDownload(selectedForm)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  
                  {selectedForm.status === 'pending' && !isAdmin && (
                    <Button onClick={() => {
                      handleSignForm(selectedForm.id);
                      closeViewForm();
                    }}>
                      <Check className="w-4 h-4 mr-2" />
                      Sign Form
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {filteredForms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredForms.map((form) => (
              <Card key={form.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{form.title}</CardTitle>
                    {getStatusBadge(form.status)}
                  </div>
                  <CardDescription>
                    Version {form.version} • Required by {form.requiredBy}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-700">{form.description}</p>
                  
                  <dl className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Created:</dt>
                      <dd>{formatDate(form.createdDate)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Expires:</dt>
                      <dd>{formatDate(form.expiryDate)}</dd>
                    </div>
                    {form.status === 'signed' && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Signed:</dt>
                        <dd>{formatDate(form.signedDate)}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm" onClick={() => handleViewForm(form)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    
                    {form.status === 'pending' && !isAdmin && (
                      <Button size="sm" onClick={() => handleSignForm(form.id)}>
                        <Check className="w-4 h-4 mr-1" />
                        Sign
                      </Button>
                    )}
                    
                    {form.status === 'signed' && (
                      <Button variant="outline" size="sm" onClick={() => handleDownload(form)}>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                    
                    {isAdmin && form.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-1" />
                        Reassign
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No consent forms</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'No forms matching your search criteria.' : 'No consent forms available at this time.'}
            </p>
            {isAdmin && (
              <div className="mt-4">
                <Button onClick={() => setIsFormOpen(true)}>
                  Upload New Form
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ConsentForms;
