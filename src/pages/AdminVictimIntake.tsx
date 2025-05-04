
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { FileText, Users, Calendar, Settings, Bell, Save, Plus, FileText as FileIcon } from 'lucide-react';

const AdminVictimIntake = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    
    // Case Information
    caseType: '',
    description: '',
    priorityLevel: 'medium',
    
    // Required Documents
    hasIdentification: false,
    hasProofOfResidence: false,
    hasIncomeVerification: false,
    
    // Consent
    consentToShare: false,
    privacyAgreement: false
  });
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  // Next form step
  const handleNextStep = () => {
    if (formStep < 4) {
      setFormStep(formStep + 1);
    }
  };
  
  // Previous form step
  const handlePreviousStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate consent checkboxes
    if (!formData.consentToShare || !formData.privacyAgreement) {
      toast.error("Consent and privacy agreement are required");
      return;
    }
    
    toast.success("Victim successfully registered");
    navigate("/admin/victims");
  };
  
  // Get sidebar items
  const getSidebarItems = () => [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <FileText />,
    },
    {
      name: 'Intake',
      href: '/admin/intake',
      icon: <Plus />,
    },
    {
      name: 'Victims',
      href: '/admin/victims',
      icon: <Users />,
    },
    {
      name: 'Cases',
      href: '/admin/cases',
      icon: <FileIcon />,
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
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings />,
    },
  ];
  
  // Render form step indicator
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step} 
            className={`flex flex-col items-center ${step <= formStep ? 'text-healing-600' : 'text-gray-400'}`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                ${step < formStep ? 'bg-healing-600 text-white' : 
                  step === formStep ? 'border-2 border-healing-600 text-healing-600' : 
                  'border-2 border-gray-300 text-gray-400'}`}
            >
              {step < formStep ? '✓' : step}
            </div>
            <span className="text-xs">
              {step === 1 ? 'Personal' : 
               step === 2 ? 'Contact' :
               step === 3 ? 'Case' : 'Consent'}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  // Render personal information form
  const renderPersonalInfoForm = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  // Render address and emergency contact form
  const renderContactForm = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Address Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Emergency Contact</h3>
          
          <div className="space-y-2">
            <Label htmlFor="emergencyName">Full Name</Label>
            <Input
              id="emergencyName"
              name="emergencyName"
              value={formData.emergencyName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyRelation">Relationship</Label>
              <Input
                id="emergencyRelation"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Phone</Label>
              <Input
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render case information form
  const renderCaseForm = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Case Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="caseType">Case Type</Label>
            <select
              id="caseType"
              name="caseType"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.caseType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Case Type</option>
              <option value="housing">Housing Assistance</option>
              <option value="medical">Medical Support</option>
              <option value="legal">Legal Aid</option>
              <option value="financial">Financial Support</option>
              <option value="family">Family Services</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Case Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priorityLevel">Priority Level</Label>
            <select
              id="priorityLevel"
              name="priorityLevel"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.priorityLevel}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Required Documents</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasIdentification"
              checked={formData.hasIdentification}
              onCheckedChange={(checked) => handleCheckboxChange('hasIdentification', checked === true)}
            />
            <Label htmlFor="hasIdentification">Identification (ID, Passport, etc.)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasProofOfResidence"
              checked={formData.hasProofOfResidence}
              onCheckedChange={(checked) => handleCheckboxChange('hasProofOfResidence', checked === true)}
            />
            <Label htmlFor="hasProofOfResidence">Proof of Residence</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasIncomeVerification"
              checked={formData.hasIncomeVerification}
              onCheckedChange={(checked) => handleCheckboxChange('hasIncomeVerification', checked === true)}
            />
            <Label htmlFor="hasIncomeVerification">Income Verification</Label>
          </div>
        </div>
      </div>
    );
  };
  
  // Render consent and submit form
  const renderConsentForm = () => {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Terms & Consent</h3>
          <p className="text-yellow-700 mb-2">
            By registering with Case Compass, you are agreeing to the following terms and conditions:
          </p>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-2">
            <li>Your information will be securely stored in our system</li>
            <li>We may share your information with relevant service providers to assist with your case</li>
            <li>We will protect your personal data according to our privacy policy</li>
            <li>You can request access to or deletion of your data at any time</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consentToShare"
              checked={formData.consentToShare}
              onCheckedChange={(checked) => handleCheckboxChange('consentToShare', checked === true)}
            />
            <div>
              <Label htmlFor="consentToShare" className="font-medium">Consent to Share Information</Label>
              <p className="text-sm text-gray-500">
                I give permission for my information to be shared with appropriate service providers to facilitate assistance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacyAgreement"
              checked={formData.privacyAgreement}
              onCheckedChange={(checked) => handleCheckboxChange('privacyAgreement', checked === true)}
            />
            <div>
              <Label htmlFor="privacyAgreement" className="font-medium">Privacy Agreement</Label>
              <p className="text-sm text-gray-500">
                I have read and agree to the privacy policy and terms of service.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 text-sm">
            By clicking "Complete Registration", a new victim profile will be created and a case will be initiated 
            based on the information provided. You will be able to edit this information later if needed.
          </p>
        </div>
      </div>
    );
  };
  
  // Render current form step
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return renderPersonalInfoForm();
      case 2:
        return renderContactForm();
      case 3:
        return renderCaseForm();
      case 4:
        return renderConsentForm();
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout title="Victim Intake" sidebarItems={getSidebarItems()}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">New Victim Registration</h1>
          <p className="text-gray-500">Register a new victim to provide assistance</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepIndicator()}
            <form onSubmit={handleSubmit}>
              {renderFormStep()}
              
              <div className="mt-8 flex justify-between">
                {formStep > 1 && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handlePreviousStep}
                  >
                    Previous
                  </Button>
                )}
                
                {formStep < 4 ? (
                  <Button 
                    type="button" 
                    className="ml-auto"
                    onClick={handleNextStep}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto bg-healing-600 hover:bg-healing-700">
                    <Save className="w-4 h-4 mr-2" />
                    Complete Registration
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminVictimIntake;
