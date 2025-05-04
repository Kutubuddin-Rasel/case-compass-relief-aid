
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const Header = ({ title, toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('User');
  
  useEffect(() => {
    // In a real app, this would come from an auth context
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
    
    // Mock user name - in a real app, this would come from an auth context
    setUserName(storedUserType === 'admin' ? 'Admin User' : 'John Doe');
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('userType');
    toast.success('You have been logged out');
    navigate('/login');
  };
  
  const handleViewProfile = () => {
    navigate(userType === 'admin' ? '/admin/profile' : '/profile');
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          {toggleSidebar && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-4 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          <h1 className="text-2xl font-semibold text-healing-800">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {userType ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-healing-100 text-healing-800">
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleViewProfile}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(userType === 'admin' ? '/admin/settings' : '/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
