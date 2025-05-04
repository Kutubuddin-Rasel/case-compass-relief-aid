
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
import { Menu, Bell, UserCog } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const AdminHeader = ({ title, toggleSidebar, isSidebarOpen }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('Admin User');
  const [notificationCount, setNotificationCount] = useState(3);
  
  useEffect(() => {
    // Check if user is authenticated and is an admin
    const userType = localStorage.getItem('userType');
    if (!userType) {
      navigate('/login');
    } else if (userType !== 'admin') {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('userType');
    toast.success('You have been logged out');
    navigate('/login');
  };
  
  const handleViewProfile = () => {
    navigate('/admin/profile');
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
          <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/admin/notifications')}>
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-purple-100 text-purple-800">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleViewProfile}>
                <UserCog className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
