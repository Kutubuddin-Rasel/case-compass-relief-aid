
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink 
} from '@/components/ui/navigation-menu';
import { ExternalLink, Layout, Shield, FileText, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 h-10 w-10 rounded-full bg-healing-600 flex items-center justify-center">
              <Shield className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-healing-700">Case Compass</h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex">
              <NavigationMenuItem>
                <NavigationMenuLink className={cn("px-4 py-2 hover:text-healing-600")}>
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={cn("px-4 py-2 hover:text-healing-600")}>
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={cn("px-4 py-2 hover:text-healing-600")}>
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/register')}>Register</Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-healing-50 to-support-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-healing-800 mb-4">
                Supporting Relief Aid Management
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Case Compass provides a secure platform for relief aid organizations to manage cases, documents, and appointments for victims in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-healing-600 hover:bg-healing-700"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-healing-600 text-healing-600"
                  onClick={() => navigate('/login')}
                >
                  Login to Dashboard
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-healing-600 rounded-lg opacity-10 blur-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop" 
                  alt="Relief Management System" 
                  className="rounded-lg shadow-xl relative w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-healing-700 mb-4">Comprehensive Case Management</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers a range of features to streamline relief aid management and improve outcomes for victims.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-healing-100 rounded-lg flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-healing-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-healing-700">Dashboard Overview</h3>
              <p className="text-gray-600">
                Comprehensive dashboard providing at-a-glance insights into case status, appointments, and important updates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-support-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-support-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-healing-700">Document Management</h3>
              <p className="text-gray-600">
                Secure storage and organization of critical documents, medical records, and consent forms for each case.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="h-12 w-12 bg-healing-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-healing-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-healing-700">Case Coordination</h3>
              <p className="text-gray-600">
                Streamlined communication between administrators and victims with appointment scheduling and notifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-healing-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your relief aid management?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join organizations that are making a difference with Case Compass.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white text-healing-600 hover:bg-gray-100 border-white"
            onClick={() => navigate('/register')}
          >
            Create Your Account <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="mr-2 h-8 w-8 rounded-full bg-healing-600 flex items-center justify-center">
                  <Shield className="text-white h-4 w-4" />
                </div>
                <span className="font-bold text-xl">Case Compass</span>
              </div>
              <p className="text-gray-600 max-w-md">
                Providing relief aid organizations with the tools they need to manage cases effectively and compassionately.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Security</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Contact Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Privacy Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Twitter</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">LinkedIn</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-healing-600">Facebook</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Case Compass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
