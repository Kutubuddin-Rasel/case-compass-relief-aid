
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

// Mock data
const mockAppointments = [
  {
    id: 'apt1',
    title: 'Medical Check-up',
    date: '2025-05-07T10:00:00',
    status: 'confirmed',
    type: 'medical',
    location: 'Central Hospital, Room 305',
  },
  {
    id: 'apt2',
    title: 'Legal Consultation',
    date: '2025-05-09T14:30:00',
    status: 'pending',
    type: 'legal',
    location: 'Legal Aid Office',
  },
  {
    id: 'apt3',
    title: 'Therapy Session',
    date: '2025-05-12T11:15:00',
    status: 'confirmed',
    type: 'support',
    location: 'Community Center',
  },
];

interface AppointmentListProps {
  isAdmin?: boolean;
}

const AppointmentList = ({ isAdmin = false }: AppointmentListProps) => {
  const [appointments] = useState(mockAppointments);
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  
  const handleViewDetails = (aptId: string) => {
    navigate(`/appointments/${aptId}`);
  };
  
  const handleRequestAppointment = () => {
    navigate('/appointments/request');
  };
  
  const handleReschedule = (aptId: string) => {
    toast.info(`Reschedule request sent for appointment ${aptId}`);
  };
  
  const handleConfirm = (aptId: string) => {
    toast.success(`Appointment ${aptId} confirmed`);
  };
  
  const handleCancel = (aptId: string) => {
    toast.info(`Appointment ${aptId} cancelled`);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled appointments</CardDescription>
        </div>
        
        {!isAdmin && (
          <Button onClick={handleRequestAppointment}>
            Request Appointment
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="mb-3 sm:mb-0">
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-900">{apt.title}</h4>
                  <Badge
                    className="ml-2"
                    variant={apt.status === 'confirmed' ? 'default' : 'outline'}
                  >
                    {apt.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">{formatDate(apt.date)}</p>
                <p className="text-sm text-gray-500">{apt.location}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(apt.id)}>
                  Details
                </Button>
                
                {!isAdmin && apt.status === 'confirmed' && (
                  <Button variant="outline" size="sm" onClick={() => handleReschedule(apt.id)}>
                    Reschedule
                  </Button>
                )}
                
                {isAdmin && apt.status === 'pending' && (
                  <>
                    <Button variant="default" size="sm" onClick={() => handleConfirm(apt.id)}>
                      Confirm
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCancel(apt.id)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
          
          {appointments.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No upcoming appointments</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
