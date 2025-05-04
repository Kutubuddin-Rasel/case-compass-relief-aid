
import { useState } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Home, FileText, Calendar, Users, Bell, Settings, ClipboardList, FileImage,
  DollarSign, CheckCircle, XCircle, Clock, AlertCircle, Download, FileCheck, Plus
} from 'lucide-react';

// Mock financial aid data
const mockFinancialAid = [
  {
    id: 'fa-001',
    type: 'Medical Treatment',
    amount: 5000,
    amountApproved: 5000,
    status: 'approved',
    requestDate: '2025-03-20T10:00:00',
    approvalDate: '2025-03-25T14:30:00',
    paymentDate: '2025-03-30T09:15:00',
    purpose: 'Initial surgical procedures and hospital stay',
    notes: 'Full amount approved for critical treatment',
    caseId: 'CS-2023-001'
  },
  {
    id: 'fa-002',
    type: 'Rehabilitation',
    amount: 2500,
    amountApproved: 2500,
    status: 'approved',
    requestDate: '2025-04-05T11:30:00',
    approvalDate: '2025-04-10T16:45:00',
    paymentDate: '2025-04-15T10:30:00',
    purpose: 'Physical therapy sessions (12 weeks)',
    notes: 'Full amount approved for rehabilitation program',
    caseId: 'CS-2023-001'
  },
  {
    id: 'fa-003',
    type: 'Living Expenses',
    amount: 3000,
    amountApproved: 1500,
    status: 'partially_approved',
    requestDate: '2025-04-20T09:20:00',
    approvalDate: '2025-04-25T14:00:00',
    paymentDate: '2025-04-30T11:15:00',
    purpose: 'Rent and utilities for 3 months during recovery',
    notes: 'Partial amount approved due to budget constraints',
    caseId: 'CS-2023-001'
  },
  {
    id: 'fa-004',
    type: 'Psychological Support',
    amount: 1800,
    amountApproved: 0,
    status: 'pending',
    requestDate: '2025-05-02T13:45:00',
    approvalDate: '',
    paymentDate: '',
    purpose: 'Trauma counseling sessions (16 weeks)',
    notes: 'Awaiting approval from financial committee',
    caseId: 'CS-2023-001'
  }
];

interface FinancialAidProps {
  isAdmin?: boolean;
}

const FinancialAid = ({ isAdmin = false }: FinancialAidProps) => {
  const [financialAid, setFinancialAid] = useState(mockFinancialAid);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState({
    id: '',
    type: '',
    amount: 0,
    amountApproved: 0,
    status: 'pending',
    requestDate: '',
    approvalDate: '',
    paymentDate: '',
    purpose: '',
    notes: '',
    caseId: 'CS-2023-001'
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
    
    const newRequest = {
      ...currentRequest,
      id: `fa-${Date.now()}`,
      requestDate: new Date().toISOString(),
      status: 'pending',
      amountApproved: 0
    };
    
    setFinancialAid([...financialAid, newRequest]);
    setIsFormOpen(false);
    setCurrentRequest({
      id: '',
      type: '',
      amount: 0,
      amountApproved: 0,
      status: 'pending',
      requestDate: '',
      approvalDate: '',
      paymentDate: '',
      purpose: '',
      notes: '',
      caseId: 'CS-2023-001'
    });
    
    toast.success('Financial aid request submitted successfully');
  };
  
  const handleApprove = (id: string, fullAmount: boolean = true) => {
    setFinancialAid(financialAid.map(aid => {
      if (aid.id === id) {
        return {
          ...aid,
          status: fullAmount ? 'approved' : 'partially_approved',
          amountApproved: fullAmount ? aid.amount : aid.amount / 2, // For demonstration purposes
          approvalDate: new Date().toISOString(),
          paymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days later
        };
      }
      return aid;
    }));
    
    toast.success(`Aid request ${fullAmount ? 'fully' : 'partially'} approved`);
  };
  
  const handleReject = (id: string) => {
    setFinancialAid(financialAid.map(aid => {
      if (aid.id === id) {
        return {
          ...aid,
          status: 'rejected',
          amountApproved: 0,
          approvalDate: new Date().toISOString()
        };
      }
      return aid;
    }));
    
    toast.info('Aid request rejected');
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partially_approved':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'partially_approved':
        return 'Partially Approved';
      case 'rejected':
        return 'Rejected';
      case 'pending':
      default:
        return 'Pending';
    }
  };
  
  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const calculateTotalAid = () => {
    return financialAid.reduce((total, aid) => {
      if (aid.status === 'approved' || aid.status === 'partially_approved') {
        return total + aid.amountApproved;
      }
      return total;
    }, 0);
  };
  
  const getPendingRequests = () => {
    return financialAid.filter(aid => aid.status === 'pending');
  };
  
  return (
    <DashboardLayout
      title="Financial Aid"
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Aid Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(calculateTotalAid())}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getPendingRequests().length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Approval Rate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">
                {financialAid.length > 0 
                  ? `${Math.round((financialAid.filter(aid => aid.status === 'approved' || aid.status === 'partially_approved').length / financialAid.length) * 100)}%`
                  : '0%'
                }
              </div>
              <Progress value={financialAid.length > 0
                ? (financialAid.filter(aid => aid.status === 'approved' || aid.status === 'partially_approved').length / financialAid.length) * 100
                : 0
              } />
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Aid Requests</h2>
          
          {!isAdmin && (
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Aid Request
            </Button>
          )}
        </div>
        
        {isFormOpen && !isAdmin && (
          <Card className="mb-6">
            <form onSubmit={handleFormSubmit}>
              <CardHeader>
                <CardTitle>New Financial Aid Request</CardTitle>
                <CardDescription>Fill out the form to request financial assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Aid Type</label>
                    <Input 
                      value={currentRequest.type}
                      onChange={(e) => setCurrentRequest({...currentRequest, type: e.target.value})}
                      placeholder="E.g., Medical Treatment, Rehabilitation"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount Requested</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        className="pl-10"
                        value={currentRequest.amount || ''}
                        onChange={(e) => setCurrentRequest({...currentRequest, amount: parseFloat(e.target.value)})}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Purpose</label>
                    <Textarea 
                      value={currentRequest.purpose}
                      onChange={(e) => setCurrentRequest({...currentRequest, purpose: e.target.value})}
                      placeholder="Describe what the funds will be used for"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Additional Notes</label>
                    <Textarea 
                      value={currentRequest.notes}
                      onChange={(e) => setCurrentRequest({...currentRequest, notes: e.target.value})}
                      placeholder="Any additional information for the request"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Request
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        
        <div className="space-y-4">
          {financialAid.length > 0 ? (
            financialAid.map((aid) => (
              <Card key={aid.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{aid.type}</CardTitle>
                    <Badge className={
                      aid.status === 'approved' ? 'bg-green-100 text-green-800' :
                      aid.status === 'partially_approved' ? 'bg-yellow-100 text-yellow-800' :
                      aid.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      <span className="flex items-center">
                        {getStatusIcon(aid.status)}
                        <span className="ml-1">{getStatusText(aid.status)}</span>
                      </span>
                    </Badge>
                  </div>
                  <CardDescription>
                    Requested on {formatDate(aid.requestDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Amount Requested</div>
                      <div className="text-lg font-bold">{formatCurrency(aid.amount)}</div>
                    </div>
                    
                    {(aid.status === 'approved' || aid.status === 'partially_approved') && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Amount Approved</div>
                        <div className="text-lg font-bold">{formatCurrency(aid.amountApproved)}</div>
                      </div>
                    )}
                    
                    {aid.approvalDate && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Approval Date</div>
                        <div>{formatDate(aid.approvalDate)}</div>
                      </div>
                    )}
                    
                    {aid.paymentDate && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Payment Date</div>
                        <div>{formatDate(aid.paymentDate)}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-500">Purpose</div>
                    <p className="mt-1">{aid.purpose}</p>
                  </div>
                  
                  {aid.notes && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500">Notes</div>
                      <p className="mt-1 text-gray-700">{aid.notes}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {isAdmin && aid.status === 'pending' ? (
                    <div className="flex space-x-3">
                      <Button onClick={() => handleApprove(aid.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Full
                      </Button>
                      <Button variant="outline" onClick={() => handleApprove(aid.id, false)}>
                        Approve Partial
                      </Button>
                      <Button variant="destructive" onClick={() => handleReject(aid.id)}>
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <Button variant="outline">
                        <FileCheck className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {aid.status === 'approved' || aid.status === 'partially_approved' ? (
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download Receipt
                        </Button>
                      ) : null}
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 border rounded-md bg-white">
              <DollarSign className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No financial aid requests</h3>
              <p className="mt-1 text-sm text-gray-500">
                No financial aid requests have been submitted yet.
              </p>
              {!isAdmin && (
                <div className="mt-4">
                  <Button onClick={() => setIsFormOpen(true)}>
                    Create New Request
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialAid;
