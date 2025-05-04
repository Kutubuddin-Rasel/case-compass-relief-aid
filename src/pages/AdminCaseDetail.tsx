
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Home, Users, FileText, Calendar, Bell, Settings, ClipboardList, Edit, Save, File, ArrowLeft } from 'lucide-react';

// Mock case data
const mockCase = {
  id: 'CS-2025-001',
  title: 'Medical Treatment Aid',
  description: 'Case involves providing medical treatment assistance for acid attack injuries to face and upper body.',
  victimName: 'John Doe',
  victimId: 'v001',
  dateOpened: '2025-02-15T10:30:00',
  status: 'open',
  priority: 'high',
  caseWorker: 'Emma Johnson',
  assignedTo: 'Medical Response Team',
  lastUpdated: '2025-04-28T14:30:00',
  notes: [
    {
      id: 'note1',
      createdBy: 'Emma Johnson',
      createdAt: '2025-02-15T10:30:00',
      content: 'Initial case opened. Victim requires immediate medical assistance for acid burns on face and arms.'
    },
    {
      id: 'note2',
      createdBy: 'Dr. Sarah Williams',
      createdAt: '2025-02-16T09:15:00',
      content: 'Medical assessment completed. Recommended treatment plan includes surgery and skin grafts. Cost estimate provided to financial team.'
    },
    {
      id: 'note3',
      createdBy: 'Emma Johnson',
      createdAt: '2025-03-10T11:45:00',
      content: 'Financial aid approved. Treatment scheduled to begin next week.'
    }
  ],
  documents: [
    {
      id: 'doc1',
      name: 'Initial Assessment.pdf',
      uploadedBy: 'Emma Johnson',
      uploadedAt: '2025-02-15T11:20:00',
      type: 'application/pdf',
      size: '2.4 MB'
    },
    {
      id: 'doc2',
      name: 'Medical Report.docx',
      uploadedBy: 'Dr. Sarah Williams',
      uploadedAt: '2025-02-16T10:30:00',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: '1.8 MB'
    },
    {
      id: 'doc3',
      name: 'Financial Aid Approval.pdf',
      uploadedBy: 'Financial Department',
      uploadedAt: '2025-03-09T15:45:00',
      type: 'application/pdf',
      size: '1.2 MB'
    }
  ],
  timeline: [
    {
      id: 'event1',
      date: '2025-02-15T10:30:00',
      title: 'Case Opened',
      description: 'Case opened by Emma Johnson'
    },
    {
      id: 'event2',
      date: '2025-02-16T09:15:00',
      title: 'Medical Assessment',
      description: 'Medical assessment completed by Dr. Sarah Williams'
    },
    {
      id: 'event3',
      date: '2025-03-09T15:45:00',
      title: 'Financial Aid Approved',
      description: 'Financial aid for medical treatment approved'
    },
    {
      id: 'event4',
      date: '2025-03-15T09:00:00',
      title: 'Treatment Started',
      description: 'Medical treatment began at City Hospital'
    }
  ]
};

const AdminCaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(mockCase);
  const [isEditing, setIsEditing] = useState(false);
  const [editableCase, setEditableCase] = useState(mockCase);
  const [newNote, setNewNote] = useState('');

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

  const handleSaveCase = () => {
    setCaseData(editableCase);
    setIsEditing(false);
    toast.success('Case details updated successfully!');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast.error('Note content cannot be empty');
      return;
    }

    const newNoteObj = {
      id: `note${caseData.notes.length + 1}`,
      createdBy: 'Admin User',
      createdAt: new Date().toISOString(),
      content: newNote
    };

    const updatedCaseData = {
      ...caseData,
      notes: [newNoteObj, ...caseData.notes],
      lastUpdated: new Date().toISOString()
    };

    setCaseData(updatedCaseData);
    setNewNote('');
    toast.success('Note added successfully!');
  };

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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <DashboardLayout title={`Case: ${caseData.id}`} sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate('/admin/cases')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cases
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{caseData.title}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-gray-500">Case ID: {caseData.id}</span>
              <span>•</span>
              <span className="flex items-center gap-2">
                Status: {getStatusBadge(caseData.status)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                Priority: {getPriorityBadge(caseData.priority)}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Case
                </>
              )}
            </Button>
            
            {isEditing && (
              <Button onClick={handleSaveCase}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Case Details</TabsTrigger>
            <TabsTrigger value="notes">Case Notes</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Victim Name</p>
                    <p className="font-medium">{caseData.victimName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Victim ID</p>
                    <p className="font-medium">{caseData.victimId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Opened</p>
                    <p className="font-medium">{formatDate(caseData.dateOpened)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{formatDate(caseData.lastUpdated)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Case Worker</p>
                    <p className="font-medium">{caseData.caseWorker}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="font-medium">{caseData.assignedTo}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="mt-1">{caseData.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Add Note</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter case note here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button className="mt-2" onClick={handleAddNote}>Add Note</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Case Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {caseData.notes.length > 0 ? (
                  <div className="space-y-4">
                    {caseData.notes.map((note) => (
                      <div key={note.id} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{note.createdBy}</p>
                          <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
                        </div>
                        <p className="mt-2">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No notes available for this case.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle>Case Documents</CardTitle>
                <Button>Upload Document</Button>
              </CardHeader>
              <CardContent>
                {caseData.documents.length > 0 ? (
                  <div className="space-y-2">
                    {caseData.documents.map((doc) => (
                      <div key={doc.id} className="p-4 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <File className="h-10 w-10 text-blue-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>Uploaded by {doc.uploadedBy}</span>
                              <span>•</span>
                              <span>{formatDate(doc.uploadedAt)}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline">Download</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No documents available for this case.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Case Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {caseData.timeline.length > 0 ? (
                  <div className="relative border-l-2 border-gray-200 ml-4 pl-8 space-y-8">
                    {caseData.timeline.map((event, index) => (
                      <div key={event.id} className="relative">
                        <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-500"></div>
                        <div>
                          <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                          <p className="font-medium">{event.title}</p>
                          <p className="mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No timeline events available for this case.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminCaseDetail;
