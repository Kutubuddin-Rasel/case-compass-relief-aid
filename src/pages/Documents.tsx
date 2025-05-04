
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { FileText, Search, Upload, Download, Trash, Home, FileImage, Calendar, Users, Bell, Settings, ClipboardList } from 'lucide-react';

// Mock documents data
const mockDocuments = [
  {
    id: 'doc1',
    name: 'Medical Report.pdf',
    type: 'medical',
    uploadedAt: '2025-04-10T11:22:00',
    uploadedBy: 'Dr. Sarah Miller',
    caseId: 'CS-2023-001',
    caseName: 'Medical Treatment Support'
  },
  {
    id: 'doc2',
    name: 'Treatment Plan.pdf',
    type: 'medical',
    uploadedAt: '2025-04-15T09:45:00',
    uploadedBy: 'Dr. Sarah Miller',
    caseId: 'CS-2023-001',
    caseName: 'Medical Treatment Support'
  },
  {
    id: 'doc3',
    name: 'Police Report.pdf',
    type: 'legal',
    uploadedAt: '2025-04-05T14:20:00',
    uploadedBy: 'Atty. Robert Johnson',
    caseId: 'CS-2023-002',
    caseName: 'Legal Aid Application'
  },
  {
    id: 'doc4',
    name: 'Consent Form - Medical Treatment.pdf',
    type: 'consent',
    uploadedAt: '2025-03-20T10:15:00',
    uploadedBy: 'Admin User',
    caseId: 'CS-2023-001',
    caseName: 'Medical Treatment Support'
  },
  {
    id: 'doc5',
    name: 'Financial Aid Application.pdf',
    type: 'financial',
    uploadedAt: '2025-04-18T16:30:00',
    uploadedBy: 'John Doe',
    caseId: 'CS-2023-001',
    caseName: 'Medical Treatment Support'
  }
];

interface DocumentsProps {
  isAdmin?: boolean;
}

const Documents = ({ isAdmin = false }: DocumentsProps) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('medical');
  const [documentCase, setDocumentCase] = useState<string>('CS-2023-001');
  
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    const newDocument = {
      id: `doc${Date.now()}`,
      name: selectedFile.name,
      type: documentType,
      uploadedAt: new Date().toISOString(),
      uploadedBy: isAdmin ? 'Admin User' : 'John Doe',
      caseId: documentCase,
      caseName: documentCase === 'CS-2023-001' ? 'Medical Treatment Support' : 'Legal Aid Application'
    };
    
    setDocuments([...documents, newDocument]);
    setSelectedFile(null);
    
    // Reset the file input
    const fileInput = document.getElementById('document-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    toast.success('Document uploaded successfully');
  };
  
  const handleDelete = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast.success('Document deleted successfully');
  };
  
  const handleDownload = (doc: {name: string}) => {
    // In a real app, this would trigger a file download
    toast.success(`Downloading ${doc.name}`);
  };
  
  const filteredDocuments = documents.filter(doc => {
    // Filter by search term
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.caseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by document type
    const matchesType = activeType === 'all' || doc.type === activeType;
    
    return matchesSearch && matchesType;
  });
  
  return (
    <DashboardLayout
      title="Documents"
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs value={activeType} onValueChange={setActiveType}>
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="consent">Consent</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeType} className="mt-6">
            {(isAdmin || true) && (
              <div className="mb-6 p-4 border rounded-md bg-white">
                <h3 className="text-lg font-medium mb-4">Upload New Document</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                    >
                      <option value="medical">Medical</option>
                      <option value="legal">Legal</option>
                      <option value="financial">Financial</option>
                      <option value="consent">Consent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related Case</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={documentCase}
                      onChange={(e) => setDocumentCase(e.target.value)}
                    >
                      <option value="CS-2023-001">CS-2023-001 - Medical Treatment Support</option>
                      <option value="CS-2023-002">CS-2023-002 - Legal Aid Application</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
                    <input
                      id="document-upload"
                      type="file"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button onClick={handleUpload} disabled={!selectedFile}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </div>
            )}
            
            {filteredDocuments.length > 0 ? (
              <div className="bg-white rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Case
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uploaded
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                            <FileText className="mr-2 h-4 w-4 text-gray-500" />
                            {doc.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a href={`/cases/${doc.caseId}`} className="hover:underline text-blue-600">
                              {doc.caseName}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(doc.uploadedAt).toLocaleDateString()} by {doc.uploadedBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(doc)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              
                              {isAdmin && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(doc.id)}
                                >
                                  <Trash className="w-4 h-4 text-red-500" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 border rounded-md bg-white">
                <FileText className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'No documents matching your search criteria.' : 'No documents have been uploaded yet.'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
