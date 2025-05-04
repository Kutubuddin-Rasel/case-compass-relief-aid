
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'sonner';
import { Home, Users, FileText, Calendar, Bell, Settings, ClipboardList, Download, PieChart as PieChartIcon } from 'lucide-react';

// Mock data for charts
const caseStatusData = [
  { name: 'Open', value: 42, color: '#4f46e5' },
  { name: 'In Progress', value: 28, color: '#f59e0b' },
  { name: 'Resolved', value: 15, color: '#10b981' },
  { name: 'Closed', value: 35, color: '#6b7280' },
];

const monthlyIntakeData = [
  { month: 'Jan', victims: 12 },
  { month: 'Feb', victims: 19 },
  { month: 'Mar', victims: 15 },
  { month: 'Apr', victims: 21 },
  { month: 'May', victims: 28 },
  { month: 'Jun', victims: 24 },
  { month: 'Jul', victims: 31 },
  { month: 'Aug', victims: 26 },
  { month: 'Sep', victims: 19 },
  { month: 'Oct', victims: 22 },
  { month: 'Nov', victims: 18 },
  { month: 'Dec', victims: 14 },
];

const servicesData = [
  { name: 'Medical', cases: 85 },
  { name: 'Psychological', cases: 65 },
  { name: 'Legal', cases: 45 },
  { name: 'Financial', cases: 30 },
  { name: 'Housing', cases: 20 },
  { name: 'Education', cases: 15 },
];

const AdminReports = () => {
  const [reportType, setReportType] = useState('cases');
  const [dateRange, setDateRange] = useState('year');
  
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

  const handleExport = (format: string) => {
    toast.success(`Exporting report as ${format.toUpperCase()}`);
  };

  const renderCasesReport = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Case Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} cases`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Services Provided</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={servicesData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#4f46e5" name="Number of Cases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntakeReport = () => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Monthly Victim Intake (2025)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyIntakeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="victims" stroke="#4f46e5" activeDot={{ r: 8 }} name="New Victims" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout title="Reports & Analytics" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="space-x-2">
            <Button
              variant={reportType === 'cases' ? 'default' : 'outline'}
              onClick={() => setReportType('cases')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Cases Report
            </Button>
            <Button
              variant={reportType === 'intake' ? 'default' : 'outline'}
              onClick={() => setReportType('intake')}
            >
              <PieChartIcon className="w-4 h-4 mr-2" />
              Victim Intake Report
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
            
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">120</div>
              <div className="text-sm text-gray-500">+8% from previous period</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Victims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">86</div>
              <div className="text-sm text-gray-500">+12% from previous period</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Resolution Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">68%</div>
              <div className="text-sm text-gray-500">+5% from previous period</div>
            </CardContent>
          </Card>
        </div>
        
        {reportType === 'cases' ? renderCasesReport() : renderIntakeReport()}
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
