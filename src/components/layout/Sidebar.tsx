
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar = ({ items }: SidebarProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed bottom-4 right-4 z-40 rounded-full bg-healing-600 text-white hover:bg-healing-700 shadow-lg md:hidden",
          isOpen && "bg-healing-700"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Toggle sidebar</span>
        {isOpen ? '✕' : '☰'}
      </Button>
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out dark:bg-gray-800",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
          !isMobile && !isOpen && "-translate-x-full",
          !isMobile && isOpen && "translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <h2 className="text-xl font-bold text-healing-700">Case Compass</h2>
        </div>
        
        <nav className="space-y-1 px-2 py-4">
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-healing-100 text-healing-700"
                    : "text-gray-700 hover:bg-healing-50 hover:text-healing-700"
                )}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <div className="mr-3">{item.icon}</div>
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <div className="text-center text-xs text-gray-500">
            <p>Case Compass Relief Aid</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
