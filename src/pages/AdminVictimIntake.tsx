
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Home, Users, FileText, Calendar, Bell, Settings, ClipboardList, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const AdminVictimIntake = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    idNumber: '',
    // Contact Info
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    // Case Info
    incidentDate: '',
    incidentDescription: '',
    incidentLocation: '',
    // Additional Info
    medicalNeeds: '',
    currentMedication: '',
    psychologicalSupport: false,
    legalAidNeeded: false,
    financialAidNeeded: false,
    housingNeeded: false
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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

  const steps = [
    {
      title: 'Personal Information',
      description: 'Basic personal details of the victim',
      fields: ['firstName', 'lastName', 'gender', 'dateOfBirth', 'idNumber']
    },
    {
      title: 'Contact Information',
      description: 'Contact details and address',
      fields: ['email', 'phone', 'address', 'city', 'state', 'zipCode']
    },
    {
      title: 'Emergency Contact',
      description: 'Person to contact in case of emergency',
      fields: ['emergencyName', 'emergencyRelationship', 'emergencyPhone']
    },
    {
      title: 'Case Information',
      description: 'Details about the incident',
      fields: ['incidentDate', 'incidentDescription', 'incidentLocation']
    },
    {
      title: 'Additional Needs',
      description: 'Support services required',
      fields: ['medicalNeeds', 'currentMedication', 'psychologicalSupport', 'legalAidNeeded', 'financialAidNeeded', 'housingNeeded']
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear the error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const newErrors: {[key: string]: string} = {};
    let isValid = true;

    currentFields.forEach((field) => {
      // Only validate string fields
      if (typeof formData[field as keyof typeof formData] === 'string') {
        const value = formData[field as keyof typeof formData] as string;
        
        if (!value.trim() && field !== 'currentMedication') { // Make currentMedication optional
          newErrors[field] = 'This field is required';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    toast.success('Victim intake completed successfully!');
    
    // Navigate to the victim management page
    setTimeout(() => {
      navigate('/admin/victims');
    }, 2000);
  };

  const renderPersonalInfo = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name*</label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name*</label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Gender*</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.gender ? 'border-red-500' : ''}`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Date of Birth*</label>
          <Input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? 'border-red-500' : ''}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">ID Number/Passport*</label>
          <Input
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className={errors.idNumber ? 'border-red-500' : ''}
          />
          {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}
        </div>
      </div>
    </>
  );

  const renderContactInfo = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email*</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone*</label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Address*</label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'border-red-500' : ''}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">City*</label>
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">State/Province*</label>
          <Input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? 'border-red-500' : ''}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Zip/Postal Code*</label>
          <Input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={errors.zipCode ? 'border-red-500' : ''}
          />
          {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
        </div>
      </div>
    </>
  );

  const renderEmergencyContact = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Emergency Contact Name*</label>
          <Input
            name="emergencyName"
            value={formData.emergencyName}
            onChange={handleChange}
            className={errors.emergencyName ? 'border-red-500' : ''}
          />
          {errors.emergencyName && <p className="text-red-500 text-sm">{errors.emergencyName}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Relationship to Victim*</label>
          <Input
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            className={errors.emergencyRelationship ? 'border-red-500' : ''}
          />
          {errors.emergencyRelationship && <p className="text-red-500 text-sm">{errors.emergencyRelationship}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Emergency Contact Phone*</label>
          <Input
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            className={errors.emergencyPhone ? 'border-red-500' : ''}
          />
          {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>}
        </div>
      </div>
    </>
  );

  const renderCaseInfo = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Incident Date*</label>
          <Input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            className={errors.incidentDate ? 'border-red-500' : ''}
          />
          {errors.incidentDate && <p className="text-red-500 text-sm">{errors.incidentDate}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Incident Location*</label>
          <Input
            name="incidentLocation"
            value={formData.incidentLocation}
            onChange={handleChange}
            className={errors.incidentLocation ? 'border-red-500' : ''}
          />
          {errors.incidentLocation && <p className="text-red-500 text-sm">{errors.incidentLocation}</p>}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Incident Description*</label>
          <Textarea
            name="incidentDescription"
            value={formData.incidentDescription}
            onChange={handleChange}
            rows={4}
            className={errors.incidentDescription ? 'border-red-500' : ''}
          />
          {errors.incidentDescription && <p className="text-red-500 text-sm">{errors.incidentDescription}</p>}
        </div>
      </div>
    </>
  );

  const renderAdditionalNeeds = () => (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Medical Needs*</label>
          <Textarea
            name="medicalNeeds"
            value={formData.medicalNeeds}
            onChange={handleChange}
            rows={3}
            className={errors.medicalNeeds ? 'border-red-500' : ''}
          />
          {errors.medicalNeeds && <p className="text-red-500 text-sm">{errors.medicalNeeds}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Medication</label>
          <Textarea
            name="currentMedication"
            value={formData.currentMedication}
            onChange={handleChange}
            rows={2}
          />
        </div>
        
        <div className="space-y-4 mt-4">
          <label className="text-sm font-medium">Required Support Services</label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="psychologicalSupport"
                name="psychologicalSupport"
                checked={formData.psychologicalSupport}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    psychologicalSupport: e.target.checked
                  });
                }}
                className="h-4 w-4"
              />
              <label htmlFor="psychologicalSupport">Psychological Support</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="legalAidNeeded"
                name="legalAidNeeded"
                checked={formData.legalAidNeeded}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    legalAidNeeded: e.target.checked
                  });
                }}
                className="h-4 w-4"
              />
              <label htmlFor="legalAidNeeded">Legal Aid</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="financialAidNeeded"
                name="financialAidNeeded"
                checked={formData.financialAidNeeded}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    financialAidNeeded: e.target.checked
                  });
                }}
                className="h-4 w-4"
              />
              <label htmlFor="financialAidNeeded">Financial Aid</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="housingNeeded"
                name="housingNeeded"
                checked={formData.housingNeeded}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    housingNeeded: e.target.checked
                  });
                }}
                className="h-4 w-4"
              />
              <label htmlFor="housingNeeded">Housing Assistance</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderContactInfo();
      case 2:
        return renderEmergencyContact();
      case 3:
        return renderCaseInfo();
      case 4:
        return renderAdditionalNeeds();
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Victim Intake" sidebarItems={sidebarItems}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">New Victim Registration</h2>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          <div className="mt-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2 bg-blue-600 transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          
          <CardContent>
            {renderCurrentStep()}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Complete
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminVictimIntake;
