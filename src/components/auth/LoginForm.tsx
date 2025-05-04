
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    // Admin login check
    if (email === "admin@gmail.com" && password === "admin") {
      toast.success("Successfully logged in as administrator");
      localStorage.setItem("userType", "admin");
      navigate("/admin/dashboard");
      return;
    }
    
    // Regular victim user login (for demo purposes)
    if (isAdmin) {
      toast.error("Invalid admin credentials");
      return;
    } else {
      toast.success("Successfully logged in as victim");
      localStorage.setItem("userType", "victim");
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-healing-700">Welcome Back</h2>
        <p className="text-sm text-gray-500 mt-1">Sign in to access your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button 
              type="button" 
              className="text-sm text-healing-600 hover:text-healing-800 hover:underline"
              onClick={() => toast.info("Password reset functionality would be implemented here")}
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-me" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember-me" className="text-sm cursor-pointer">Remember me</Label>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-healing-600 hover:bg-healing-700">
          Sign In
        </Button>
      </form>
      
      <div className="pt-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">For demo purposes</span>
          </div>
        </div>
        
        <div className="flex items-center mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="admin-toggle" 
              checked={isAdmin}
              onCheckedChange={(checked) => setIsAdmin(checked === true)}
            />
            <Label htmlFor="admin-toggle" className="text-sm cursor-pointer">
              Login as administrator
            </Label>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Admin credentials:</strong><br />
            Email: admin@gmail.com<br />
            Password: admin
          </p>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-healing-600 hover:text-healing-800 hover:underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
