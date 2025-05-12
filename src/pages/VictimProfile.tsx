
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Home, FileText, Calendar, Users, Bell, Settings, FileImage, Edit, Save } from 'lucide-react';
import { useUserProfile, useUpdateProfile } from '@/hooks/useOracleDatabase';

// Define types for our profile data
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface MedicalInfo {
  bloodType: string;
  allergies: string;
  medicalConditions: string;
}

interface VictimData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
  emergencyContact: EmergencyContact;
  medicalInfo: MedicalInfo;
  joinDate: string;
}

const VictimProfile = () => {
  // Get current user ID (in a real app, this would come from auth context)
  const userId = 'victim1'; // Placeholder for actual user ID from auth
  
  // Fetch profile data using our new hook
  const { data: profileData, isLoading, error } = useUserProfile(userId);
  const updateProfileMutation = useUpdateProfile();
  
  const [profile, setProfile] = useState<VictimData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState<VictimData | null>(null);
  const navigate = useNavigate();
  
  // Update local state when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
      setEditableProfile(profileData);
    }
  }, [profileData]);
  
  const getSidebarItems = () => {
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
        name: 'Support Network',
        href: '/support-network',
        icon: <Users />,
      },
      {
        name: 'Notifications',
        href: '/notifications',
        icon: <Bell />,
      },
      {
        name: 'Profile',
        href: '/profile',
        icon: <Users />,
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: <Settings />,
      },
    ];
  };
  
  const handleSaveProfile = async () => {
    if (!editableProfile) return;
    
    try {
      await updateProfileMutation.mutateAsync(editableProfile);
      setIsEditing(false);
    } catch (error) {
      // Error is handled in the mutation hook
      console.error("Error occurred:", error);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section?: string, field?: string) => {
    if (!editableProfile) return;
    
    const { name, value } = e.target;
    
    if (section && field) {
      setEditableProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof VictimData] as object,
            [field]: value
          }
        };
      });
    } else {
      setEditableProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value
        };
      });
    }
  };

  // Separate handler for select inputs
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, section?: string, field?: string) => {
    if (!editableProfile) return;
    
    const { name, value } = e.target;
    
    if (section && field) {
      setEditableProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof VictimData] as object,
            [field]: value
          }
        };
      });
    } else {
      setEditableProfile(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value
        };
      });
    }
  };
  
  const handleToggleEdit = () => {
    if (isEditing) {
      // Cancel edit, revert to original profile
      setEditableProfile(profile);
    }
    setIsEditing(!isEditing);
  };
  
  if (isLoading) {
    return (
      <DashboardLayout title="Loading Profile..." sidebarItems={getSidebarItems()}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-healing-600 rounded-full border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !profile || !editableProfile) {
    return (
      <DashboardLayout title="Profile Error" sidebarItems={getSidebarItems()}>
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          <p>Failed to load profile data. Please try again later.</p>
          <Button onClick={() => window.location.reload()} className="mt-2">Retry</Button>
        </div>
      </DashboardLayout>
    );
  }
  
  const renderProfileView = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{profile.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{profile.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{profile.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{profile.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-500">Street</p>
              <p className="font-medium">{profile.address.street}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p className="font-medium">{profile.address.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{profile.address.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Zip Code</p>
              <p className="font-medium">{profile.address.zipCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium">{profile.address.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{profile.emergencyContact.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Relationship</p>
              <p className="font-medium">{profile.emergencyContact.relationship}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{profile.emergencyContact.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-medium">{profile.medicalInfo.bloodType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Allergies</p>
              <p className="font-medium">{profile.medicalInfo.allergies || 'None'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Medical Conditions</p>
              <p className="font-medium">{profile.medicalInfo.medicalConditions || 'None'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium">{profile.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date Joined</p>
              <p className="font-medium">{new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  const renderProfileEdit = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="firstName"
                value={editableProfile.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="lastName"
                value={editableProfile.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                name="email"
                value={editableProfile.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                name="phone"
                value={editableProfile.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                name="dateOfBirth"
                value={editableProfile.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                className="w-full p-2 border rounded-md"
                name="gender"
                value={editableProfile.gender}
                onChange={(e) => handleSelectChange(e)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Street</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="street"
                value={editableProfile.address.street}
                onChange={(e) => handleInputChange(e, 'address', 'street')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="city"
                value={editableProfile.address.city}
                onChange={(e) => handleInputChange(e, 'address', 'city')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="state"
                value={editableProfile.address.state}
                onChange={(e) => handleInputChange(e, 'address', 'state')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zip Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="zipCode"
                value={editableProfile.address.zipCode}
                onChange={(e) => handleInputChange(e, 'address', 'zipCode')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="country"
                value={editableProfile.address.country}
                onChange={(e) => handleInputChange(e, 'address', 'country')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="name"
                value={editableProfile.emergencyContact.name}
                onChange={(e) => handleInputChange(e, 'emergencyContact', 'name')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relationship</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="relationship"
                value={editableProfile.emergencyContact.relationship}
                onChange={(e) => handleInputChange(e, 'emergencyContact', 'relationship')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                name="phone"
                value={editableProfile.emergencyContact.phone}
                onChange={(e) => handleInputChange(e, 'emergencyContact', 'phone')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Blood Type</label>
              <select
                className="w-full p-2 border rounded-md"
                name="bloodType"
                value={editableProfile.medicalInfo.bloodType}
                onChange={(e) => handleSelectChange(e, 'medicalInfo', 'bloodType')}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Allergies</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="allergies"
                value={editableProfile.medicalInfo.allergies}
                onChange={(e) => handleInputChange(e, 'medicalInfo', 'allergies')}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Medical Conditions</label>
              <textarea
                className="w-full p-2 border rounded-md"
                name="medicalConditions"
                value={editableProfile.medicalInfo.medicalConditions}
                onChange={(e) => handleInputChange(e, 'medicalInfo', 'medicalConditions')}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  return (
    <DashboardLayout title="Victim Profile" sidebarItems={getSidebarItems()}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg" alt={profile.firstName} />
              <AvatarFallback>{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-500">ID: {profile.id}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileImage className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Profile Photo</DialogTitle>
                  <DialogDescription>
                    Upload a new profile photo here. The photo should be a square image.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <input type="file" accept="image/*" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => toast.success("Photo uploaded successfully!")}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button onClick={handleToggleEdit}>
              {isEditing ? (
                <>Cancel</>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
            
            {isEditing && (
              <Button onClick={handleSaveProfile} disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? (
                  <><span className="animate-spin mr-2">⟳</span> Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="case-history">Case History</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4 mt-4">
            {isEditing ? renderProfileEdit() : renderProfileView()}
          </TabsContent>
          <TabsContent value="case-history" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Case History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 italic">No case history found for this victim.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VictimProfile;
