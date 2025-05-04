import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  Home, FileText, Calendar, Users, Bell, Settings, ClipboardList, FileImage, 
  Mail, MessageSquare, Search, RefreshCw, Plus, Filter, Check
} from 'lucide-react';

// Mock notifications data
const mockNotifications = [
  {
    id: 'notif1',
    subject: 'Appointment Confirmation',
    content: 'Your medical check-up appointment has been confirmed for May 7, 2025 at 10:00 AM at Central Hospital, Room 305.',
    sentDate: '2025-05-01T14:30:00',
    channel: 'email',
    status: 'sent',
    read: true,
    recipient: 'John Doe',
    recipientId: 'victim1'
  },
  {
    id: 'notif2',
    subject: 'Document Uploaded',
    content: 'New document "Treatment Plan.pdf" has been uploaded to your case file.',
    sentDate: '2025-04-15T09:45:00',
    channel: 'sms',
    status: 'sent',
    read: false,
    recipient: 'John Doe',
    recipientId: 'victim1'
  },
  {
    id: 'notif3',
    subject: 'Financial Aid Update',
    content: 'Your financial aid request for Medical Treatment has been approved for $5,000.',
    sentDate: '2025-03-25T14:30:00',
    channel: 'email',
    status: 'sent',
    read: true,
    recipient: 'John Doe',
    recipientId: 'victim1'
  },
  {
    id: 'notif4',
    subject: 'Appointment Reminder',
    content: 'This is a reminder for your appointment tomorrow at 11:15 AM at Community Center for your therapy session.',
    sentDate: '2025-05-11T10:00:00',
    channel: 'sms',
    status: 'sent',
    read: false,
    recipient: 'John Doe',
    recipientId: 'victim1'
  }
];

interface NotificationsProps {
  isAdmin?: boolean;
}

const Notifications = ({ isAdmin = false }: NotificationsProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    subject: '',
    content: '',
    channel: 'email',
    recipient: isAdmin ? 'all' : 'John Doe', // If admin, default to 'all', otherwise to current user
    recipientId: isAdmin ? 'all' : 'victim1'
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
  
  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new notification
    const notification = {
      id: `notif${Date.now()}`,
      subject: newNotification.subject,
      content: newNotification.content,
      sentDate: new Date().toISOString(),
      channel: newNotification.channel,
      status: 'sent',
      read: false,
      recipient: newNotification.recipient,
      recipientId: newNotification.recipientId,
    };
    
    setNotifications([notification, ...notifications]);
    setIsComposeOpen(false);
    setNewNotification({
      subject: '',
      content: '',
      channel: 'email',
      recipient: isAdmin ? 'all' : 'John Doe',
      recipientId: isAdmin ? 'all' : 'victim1'
    });
    
    toast.success('Notification sent successfully');
  };
  
  const handleMarkAsRead = (notifId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notifId ? { ...notif, read: true } : notif
    ));
  };
  
  const handleResend = (notifId: string) => {
    toast.success('Notification resent successfully');
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success('All notifications marked as read');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // If less than 24 hours, show relative time
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      if (hours < 1) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show date
    return date.toLocaleDateString();
  };
  
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const filteredNotifications = notifications.filter(notif => {
    // Filter by search term
    const matchesSearch = 
      notif.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notif.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by read/unread
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && !notif.read) || 
      (filter === 'read' && notif.read);
    
    return matchesSearch && matchesFilter;
  });
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  return (
    <DashboardLayout
      title="Notifications"
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search notifications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="p-2 border rounded w-full sm:w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
            
            {isAdmin && (
              <Button onClick={() => setIsComposeOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Notification
              </Button>
            )}
          </div>
        </div>
        
        {isComposeOpen && isAdmin && (
          <Card className="mb-6">
            <form onSubmit={handleComposeSubmit}>
              <CardHeader>
                <CardTitle>Send Notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Recipient</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={newNotification.recipientId}
                      onChange={(e) => setNewNotification({
                        ...newNotification,
                        recipientId: e.target.value,
                        recipient: e.target.value === 'all' ? 'All Victims' : 'John Doe' 
                      })}
                    >
                      <option value="all">All Victims</option>
                      <option value="victim1">John Doe</option>
                      {/* In a real app, this would be populated with all victims */}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Channel</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={newNotification.channel}
                      onChange={(e) => setNewNotification({...newNotification, channel: e.target.value})}
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="both">Both Email & SMS</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={newNotification.subject}
                    onChange={(e) => setNewNotification({...newNotification, subject: e.target.value})}
                    placeholder="Notification subject"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={newNotification.content}
                    onChange={(e) => setNewNotification({...newNotification, content: e.target.value})}
                    placeholder="Notification message"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
              <CardContent className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Send Notification
                </Button>
              </CardContent>
            </form>
          </Card>
        )}
        
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border rounded-lg ${notif.read ? 'bg-white' : 'bg-blue-50'} hover:shadow-md transition-all`}
                onClick={() => !notif.read && handleMarkAsRead(notif.id)}
              >
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="flex items-center space-x-1 py-1">
                      {getChannelIcon(notif.channel)}
                      <span>
                        {notif.channel === 'email' ? 'Email' : 
                         notif.channel === 'sms' ? 'SMS' : 'Notification'}
                      </span>
                    </Badge>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(notif.sentDate)}
                  </div>
                </div>
                
                <h3 className={`mt-2 text-lg font-medium ${notif.read ? 'text-gray-800' : 'text-black'}`}>
                  {notif.subject}
                </h3>
                
                {isAdmin && (
                  <div className="mt-1 text-sm text-gray-600">
                    To: {notif.recipient}
                  </div>
                )}
                
                <p className="mt-2 text-gray-700">
                  {notif.content}
                </p>
                
                <div className="mt-4 flex justify-end">
                  {isAdmin && (
                    <Button variant="outline" size="sm" onClick={() => handleResend(notif.id)}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Resend
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border rounded-md bg-white">
            <Bell className="mx-auto h-8 w-8 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== 'all'
                ? 'No notifications matching your criteria.'
                : 'You have no notifications at this time.'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
