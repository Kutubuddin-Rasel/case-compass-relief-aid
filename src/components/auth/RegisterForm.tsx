
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!fullName || !email || !phone || !password) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!acceptTerms) {
      toast.error("You must accept the terms and conditions");
      return;
    }
    
    // In a real app, you would send registration data to your API
    toast.success("Account created successfully!");
    
    // Store user type in localStorage (always victim for registration)
    localStorage.setItem("userType", "victim");
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-healing-700">Create an Account</h2>
        <p className="text-sm text-gray-500 mt-1">Register to access support services</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="terms" 
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            required
          />
          <Label htmlFor="terms" className="text-sm cursor-pointer">
            I agree to the{" "}
            <button
              type="button"
              onClick={() => toast.info("Terms and conditions would be displayed here")}
              className="text-healing-600 hover:text-healing-800 hover:underline"
            >
              Terms and Conditions
            </button>
          </Label>
        </div>
        
        <Button type="submit" className="w-full bg-healing-600 hover:bg-healing-700">
          Create Account
        </Button>
        
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-healing-600 hover:text-healing-800 hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
