
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Home, FileText, Calendar, Users, Bell, Settings, ClipboardList, FileImage,
  Clock, CheckCircle, XCircle, CalendarDays, Search, Plus
} from 'lucide-react';

// Mock appointments data
const mockAppointments = [
  {
    id: 'apt1',
    title: 'Medical Check-up',
    date: '2025-05-07T10:00:00',
    endDate: '2025-05-07T11:00:00',
    status: 'confirmed',
    type: 'medical',
    location: 'Central Hospital, Room 305',
    provider: 'Dr. Sarah Miller',
    notes: 'Regular follow-up checkup',
    victimId: 'victim1',
    victimName: 'John Doe',
  },
  {
    id: 'apt2',
    title: 'Legal Consultation',
    date: '2025-05-09T14:30:00',
    endDate: '2025-05-09T15:30:00',
    status: 'pending',
    type: 'legal',
    location: 'Legal Aid Office',
    provider: 'Atty. Robert Johnson',
    notes: 'Initial consultation to discuss case details',
    victimId: 'victim1',
    victimName: 'John Doe',
  },
  {
    id: 'apt3',
    title: 'Therapy Session',
    date: '2025-05-12T11:15:00',
    endDate: '2025-05-12T12:15:00',
    status: 'confirmed',
    type: 'support',
    location: 'Community Center',
    provider: 'Dr. Emily Parker',
    notes: 'Weekly therapy session',
    victimId: 'victim1',
    victimName: 'John Doe',
  },
  {
    id: 'apt4',
    title: 'Skin Graft Consultation',
    date: '2025-05-15T09:30:00',
    endDate: '2025-05-15T10:30:00',
    status: 'confirmed',
    type: 'medical',
    location: 'Central Hospital, Surgery Department',
    provider: 'Dr. Michael Chen',
    notes: 'Pre-surgery consultation for upcoming skin graft procedure',
    victimId: 'victim1',
    victimName: 'John Doe',
  }
];

interface AppointmentsProps {
  isAdmin?: boolean;
}

const Appointments = ({ isAdmin = false }: AppointmentsProps) => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState({
    id: '',
    title: '',
    date: '',
    endDate: '',
    status: 'pending',
    type: 'medical',
    location: '',
    provider: '',
    notes: '',
    victimId: 'victim1',
    victimName: 'John Doe',
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
    
    if (currentAppointment.id) {
      // Update existing appointment
      setAppointments(appointments.map(apt => 
        apt.id === currentAppointment.id ? currentAppointment : apt
      ));
      toast.success('Appointment updated successfully');
    } else {
      // Add new appointment
      const newAppointment = {
        ...currentAppointment,
        id: `apt${Date.now()}`,
      };
      setAppointments([...appointments, newAppointment]);
      toast.success(isAdmin ? 'Appointment scheduled successfully' : 'Appointment request submitted successfully');
    }
    
    // Reset form
    setIsFormOpen(false);
    setCurrentAppointment({
      id: '',
      title: '',
      date: '',
      endDate: '',
      status: 'pending',
      type: 'medical',
      location: '',
      provider: '',
      notes: '',
      victimId: 'victim1',
      victimName: 'John Doe',
    });
  };
  
  const handleConfirm = (aptId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === aptId ? { ...apt, status: 'confirmed' } : apt
    ));
    toast.success('Appointment confirmed');
  };
  
  const handleCancel = (aptId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === aptId ? { ...apt, status: 'cancelled' } : apt
    ));
    toast.info('Appointment cancelled');
  };
  
  const handleRequestReschedule = (aptId: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === aptId ? { ...apt, status: 'reschedule_requested' } : apt
    ));
    toast.info('Reschedule request submitted');
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateString ? new Date(dateString).toLocaleString('en-US', options) : '';
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'reschedule_requested':
        return <Badge className="bg-yellow-100 text-yellow-800">Reschedule Requested</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredAppointments = appointments.filter(apt => 
    apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isAdmin && apt.victimName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Sort appointments by date
  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const upcomingAppointments = sortedAppointments.filter(apt => 
    new Date(apt.date) > new Date() && 
    apt.status !== 'cancelled'
  );
  
  const pastAppointments = sortedAppointments.filter(apt => 
    new Date(apt.date) < new Date() || 
    apt.status === 'cancelled'
  );
  
  return (
    <DashboardLayout
      title="Appointments"
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search appointments..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {isAdmin ? 'Schedule Appointment' : 'Request Appointment'}
          </Button>
        </div>
        
        {isFormOpen && (
          <Card className="mb-6">
            <form onSubmit={handleFormSubmit}>
              <CardHeader>
                <CardTitle>
                  {isAdmin 
                    ? currentAppointment.id ? 'Edit Appointment' : 'Schedule New Appointment'
                    : 'Request New Appointment'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Appointment Title</label>
                    <Input 
                      value={currentAppointment.title}
                      onChange={(e) => setCurrentAppointment({...currentAppointment, title: e.target.value})}
                      placeholder="E.g., Medical Checkup, Legal Consultation"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={currentAppointment.type}
                      onChange={(e) => setCurrentAppointment({...currentAppointment, type: e.target.value})}
                    >
                      <option value="medical">Medical</option>
                      <option value="legal">Legal</option>
                      <option value="support">Support/Counseling</option>
                      <option value="admin">Administrative</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {isAdmin && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Victim</label>
                      <Input 
                        value="John Doe" // In a real app, this would be a dropdown with all victims
                        disabled
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Provider/Staff</label>
                    <Input 
                      value={currentAppointment.provider}
                      onChange={(e) => setCurrentAppointment({...currentAppointment, provider: e.target.value})}
                      placeholder="E.g., Dr. Smith, Atty. Johnson"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date & Time</label>
                    <Input 
                      type="datetime-local"
                      value={currentAppointment.date}
                      onChange={(e) => setCurrentAppointment({...currentAppointment, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Time</label>
                    <Input 
                      type="datetime-local"
                      value={currentAppointment.endDate}
                      onChange={(e) => setCurrentAppointment({...currentAppointment, endDate: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input 
                      value={currentAppointment.location}
                      onChange={(e) => setCurrentAppointment({...currentAppointment, location: e.target.value})}
                      placeholder="E.g., Central Hospital Room 305"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea 
                      value={currentAppointment.notes}
                      onChange={(e) => setCurrentAppointment({...currentAppointment, notes: e.target.value})}
                      placeholder="Any special instructions or details"
                    />
                  </div>
                </div>
              </CardContent>
              <CardContent className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isAdmin 
                    ? currentAppointment.id ? 'Update Appointment' : 'Schedule Appointment' 
                    : 'Submit Request'
                  }
                </Button>
              </CardContent>
            </form>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="mb-3 sm:mb-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{apt.title}</h4>
                        {getStatusBadge(apt.status)}
                      </div>
                      <div className="mt-1 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-gray-800">{formatDate(apt.date)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Home className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-gray-800">{apt.location}</span>
                        </div>
                        {isAdmin && (
                          <div className="flex items-center mt-1">
                            <Users className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-gray-800">{apt.victimName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {isAdmin ? (
                        apt.status === 'pending' ? (
                          <>
                            <Button size="sm" onClick={() => handleConfirm(apt.id)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirm
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleCancel(apt.id)}>
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </>
                        ) : apt.status === 'reschedule_requested' ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                setCurrentAppointment(apt);
                                setIsFormOpen(true);
                              }}
                            >
                              Reschedule
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleCancel(apt.id)}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurrentAppointment(apt);
                                setIsFormOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleCancel(apt.id)}>
                              Cancel
                            </Button>
                          </>
                        )
                      ) : (
                        apt.status === 'confirmed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRequestReschedule(apt.id)}
                          >
                            Request Reschedule
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6">
                <CalendarDays className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'No appointments matching your search.' : 'No upcoming appointments scheduled.'}
                </p>
                <div className="mt-4">
                  <Button onClick={() => setIsFormOpen(true)}>
                    {isAdmin ? 'Schedule Appointment' : 'Request Appointment'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {pastAppointments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Past Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{apt.title}</h4>
                        {getStatusBadge(apt.status)}
                      </div>
                      <div className="mt-1 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-gray-800">{formatDate(apt.date)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Home className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-gray-800">{apt.location}</span>
                        </div>
                        {isAdmin && (
                          <div className="flex items-center mt-1">
                            <Users className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-gray-800">{apt.victimName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
