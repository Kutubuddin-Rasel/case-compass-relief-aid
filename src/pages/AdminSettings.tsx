
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Home, Users, FileText, Calendar, Bell, Settings, ClipboardList, User, Lock, Smartphone, Mail, Building, CheckCircle } from 'lucide-react';

// Mock admin users data
const mockAdmins = [
  {
    id: 'admin1',
    name: 'John Admin',
    email: 'john.admin@example.com',
    role: 'Administrator',
    lastLogin: '2025-05-01T09:30:00',
    status: 'active'
  },
  {
    id: 'admin2',
    name: 'Sarah Manager',
    email: 'sarah.manager@example.com',
    role: 'Case Manager',
    lastLogin: '2025-05-02T14:15:00',
    status: 'active'
  },
  {
    id: 'admin3',
    name: 'David Support',
    email: 'david.support@example.com',
    role: 'Support Staff',
    lastLogin: '2025-04-28T11:45:00',
    status: 'inactive'
  }
];

const AdminSettings = () => {
  const [admins, setAdmins] = useState(mockAdmins);
  const [currentTab, setCurrentTab] = useState('general');
  const [newAdminForm, setNewAdminForm] = useState({
    name: '',
    email: '',
    role: 'Support Staff',
    password: '',
    confirmPassword: ''
  });
  
  // General settings
  const [settings, setSettings] = useState({
    organizationName: 'Case Compass',
    address: '123 Main St, Metropolis',
    phone: '(555) 123-4567',
    email: 'contact@casecompass.org',
    enableSMS: true,
    enableEmailNotifications: true,
    allowVictimRegistration: true,
    requireAdminApproval: true,
    caseAutoClose: false,
    dataRetentionDays: 365,
    systemLogo: '/assets/logo.png',
    primaryColor: '#4f46e5'
  });
  
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

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setSettings({
        ...settings,
        [name]: e.target.checked
      });
    } else {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };

  const handleToggleSetting = (name: string, value: boolean) => {
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  const handleNewAdminChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAdminForm({
      ...newAdminForm,
      [name]: value
    });
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newAdminForm.password !== newAdminForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    const newAdmin = {
      id: `admin${Date.now()}`,
      name: newAdminForm.name,
      email: newAdminForm.email,
      role: newAdminForm.role,
      lastLogin: '-',
      status: 'active'
    };
    
    setAdmins([...admins, newAdmin]);
    
    // Reset form
    setNewAdminForm({
      name: '',
      email: '',
      role: 'Support Staff',
      password: '',
      confirmPassword: ''
    });
    
    toast.success('Admin user added successfully');
  };

  const handleToggleAdminStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    setAdmins(admins.map(admin => 
      admin.id === id ? { ...admin, status: newStatus } : admin
    ));
    
    toast.success(`Admin status changed to ${newStatus}`);
  };

  return (
    <DashboardLayout title="System Settings" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="admins">Admin Users</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>Basic details about your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Organization Name</label>
                    <Input
                      name="organizationName"
                      value={settings.organizationName}
                      onChange={handleSettingChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      name="phone"
                      value={settings.phone}
                      onChange={handleSettingChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={handleSettingChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      name="address"
                      value={settings.address}
                      onChange={handleSettingChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Control how the system operates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Enable SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Send SMS alerts to users</p>
                  </div>
                  <Switch
                    checked={settings.enableSMS}
                    onCheckedChange={(checked) => handleToggleSetting('enableSMS', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Enable Email Notifications</h3>
                    <p className="text-sm text-gray-500">Send email alerts to users</p>
                  </div>
                  <Switch
                    checked={settings.enableEmailNotifications}
                    onCheckedChange={(checked) => handleToggleSetting('enableEmailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Allow Self-Registration</h3>
                    <p className="text-sm text-gray-500">Let victims register their own accounts</p>
                  </div>
                  <Switch
                    checked={settings.allowVictimRegistration}
                    onCheckedChange={(checked) => handleToggleSetting('allowVictimRegistration', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Require Admin Approval</h3>
                    <p className="text-sm text-gray-500">Approve new victim accounts before activation</p>
                  </div>
                  <Switch
                    checked={settings.requireAdminApproval}
                    onCheckedChange={(checked) => handleToggleSetting('requireAdminApproval', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Retention Period (days)</label>
                  <Input
                    name="dataRetentionDays"
                    type="number"
                    value={settings.dataRetentionDays}
                    onChange={handleSettingChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="admins" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Users</CardTitle>
                <CardDescription>Manage users with administrative access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Role</th>
                        <th className="px-4 py-3 text-left">Last Login</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {admins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">{admin.name}</td>
                          <td className="px-4 py-3">{admin.email}</td>
                          <td className="px-4 py-3">{admin.role}</td>
                          <td className="px-4 py-3">
                            {admin.lastLogin === '-' ? '-' : new Date(admin.lastLogin).toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                admin.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {admin.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleAdminStatus(admin.id, admin.status)}
                            >
                              {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Add New Admin</CardTitle>
                <CardDescription>Create a new user with administrative access</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAdmin} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        name="name"
                        value={newAdminForm.name}
                        onChange={handleNewAdminChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={newAdminForm.email}
                        onChange={handleNewAdminChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <select
                        name="role"
                        value={newAdminForm.role}
                        onChange={handleNewAdminChange}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Case Manager">Case Manager</option>
                        <option value="Support Staff">Support Staff</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        name="password"
                        type="password"
                        value={newAdminForm.password}
                        onChange={handleNewAdminChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm Password</label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={newAdminForm.confirmPassword}
                        onChange={handleNewAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit">Add Admin User</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">System Name</label>
                    <Input
                      name="organizationName"
                      value={settings.organizationName}
                      onChange={handleSettingChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        name="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={handleSettingChange}
                        className="w-16 h-10"
                      />
                      <Input
                        name="primaryColor"
                        value={settings.primaryColor}
                        onChange={handleSettingChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">System Logo</label>
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 border rounded flex items-center justify-center bg-gray-50">
                        <Building className="h-10 w-10 text-gray-400" />
                      </div>
                      <Button variant="outline">Upload New Logo</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Branding Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure system security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Require 2FA for admin users</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Password Expiration</h3>
                    <p className="text-sm text-gray-500">Force password change every 90 days</p>
                  </div>
                  <Switch checked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Session Timeout</h3>
                    <p className="text-sm text-gray-500">Automatically logout after inactivity</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout Duration (minutes)</label>
                  <Input
                    type="number"
                    value="30"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Password Length</label>
                  <Input
                    type="number"
                    value="8"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
