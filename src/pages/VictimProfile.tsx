
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Home, FileText, Calendar, Users, Bell, Settings, FileImage, Edit, Save } from 'lucide-react';

// Mock victim data
const mockVictimData = {
  id: 'victim1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  phone: '(123) 456-7890',
  dateOfBirth: '1990-05-15',
  gender: 'Male',
  address: {
    street: '123 Main Street',
    city: 'Cityville',
    state: 'State',
    zipCode: '12345',
    country: 'Country'
  },
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '(098) 765-4321'
  },
  medicalInfo: {
    bloodType: 'O+',
    allergies: 'None',
    medicalConditions: 'Hypertension'
  },
  joinDate: '2025-03-10T09:00:00'
};

const VictimProfile = () => {
  const [profile, setProfile] = useState(mockVictimData);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(mockVictimData);
  
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
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfile(editableProfile);
      toast.success('Profile updated successfully');
    } else {
      // Start editing
      setEditableProfile({...profile});
    }
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section?: string, field?: string) => {
    const { name, value } = e.target;
    
    if (section && field) {
      setEditableProfile({
        ...editableProfile,
        [section]: {
          ...editableProfile[section as keyof typeof editableProfile],
          [field]: value
        }
      });
    } else {
      setEditableProfile({
        ...editableProfile,
        [name]: value
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <DashboardLayout
      title="My Profile"
      sidebarItems={getSidebarItems()}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <Button onClick={handleEditToggle}>
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarFallback className="text-3xl bg-healing-100 text-healing-800">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-semibold">{profile.firstName} {profile.lastName}</h3>
              <p className="text-gray-500">Member since {formatDate(profile.joinDate)}</p>
            </CardContent>
          </Card>
          
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    {isEditing ? (
                      <Input 
                        name="firstName"
                        value={editableProfile.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.firstName}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    {isEditing ? (
                      <Input 
                        name="lastName"
                        value={editableProfile.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.lastName}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    {isEditing ? (
                      <Input 
                        name="email"
                        value={editableProfile.email}
                        onChange={handleInputChange}
                        type="email"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.email}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    {isEditing ? (
                      <Input 
                        name="phone"
                        value={editableProfile.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.phone}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    {isEditing ? (
                      <Input 
                        name="dateOfBirth"
                        value={editableProfile.dateOfBirth}
                        onChange={handleInputChange}
                        type="date"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{formatDate(profile.dateOfBirth)}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender</label>
                    {isEditing ? (
                      <select 
                        className="w-full p-2 border rounded-md"
                        name="gender"
                        value={editableProfile.gender}
                        onChange={(e) => setEditableProfile({...editableProfile, gender: e.target.value})}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.gender}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Street Address</label>
                    {isEditing ? (
                      <Input 
                        name="street"
                        value={editableProfile.address.street}
                        onChange={(e) => handleInputChange(e, 'address', 'street')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.address.street}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    {isEditing ? (
                      <Input 
                        name="city"
                        value={editableProfile.address.city}
                        onChange={(e) => handleInputChange(e, 'address', 'city')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.address.city}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State/Province</label>
                    {isEditing ? (
                      <Input 
                        name="state"
                        value={editableProfile.address.state}
                        onChange={(e) => handleInputChange(e, 'address', 'state')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.address.state}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Zip/Postal Code</label>
                    {isEditing ? (
                      <Input 
                        name="zipCode"
                        value={editableProfile.address.zipCode}
                        onChange={(e) => handleInputChange(e, 'address', 'zipCode')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.address.zipCode}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    {isEditing ? (
                      <Input 
                        name="country"
                        value={editableProfile.address.country}
                        onChange={(e) => handleInputChange(e, 'address', 'country')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.address.country}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    {isEditing ? (
                      <Input 
                        name="name"
                        value={editableProfile.emergencyContact.name}
                        onChange={(e) => handleInputChange(e, 'emergencyContact', 'name')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.emergencyContact.name}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Relationship</label>
                    {isEditing ? (
                      <Input 
                        name="relationship"
                        value={editableProfile.emergencyContact.relationship}
                        onChange={(e) => handleInputChange(e, 'emergencyContact', 'relationship')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.emergencyContact.relationship}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    {isEditing ? (
                      <Input 
                        name="phone"
                        value={editableProfile.emergencyContact.phone}
                        onChange={(e) => handleInputChange(e, 'emergencyContact', 'phone')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.emergencyContact.phone}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Blood Type</label>
                    {isEditing ? (
                      <select
                        className="w-full p-2 border rounded-md"
                        name="bloodType"
                        value={editableProfile.medicalInfo.bloodType}
                        onChange={(e) => handleInputChange(e, 'medicalInfo', 'bloodType')}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.medicalInfo.bloodType}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Allergies</label>
                    {isEditing ? (
                      <Input 
                        name="allergies"
                        value={editableProfile.medicalInfo.allergies}
                        onChange={(e) => handleInputChange(e, 'medicalInfo', 'allergies')}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.medicalInfo.allergies || 'None'}</div>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-3">
                    <label className="text-sm font-medium">Medical Conditions</label>
                    {isEditing ? (
                      <Textarea 
                        name="medicalConditions"
                        value={editableProfile.medicalInfo.medicalConditions}
                        onChange={(e) => handleInputChange(e, 'medicalInfo', 'medicalConditions')}
                        rows={3}
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{profile.medicalInfo.medicalConditions || 'None'}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VictimProfile;
