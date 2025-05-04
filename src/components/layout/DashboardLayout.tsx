
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
  sidebarItems: Array<{
    name: string;
    href: string;
    icon: JSX.Element;
  }>;
}

const DashboardLayout = ({ title, children, sidebarItems }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={sidebarItems} />
      <div className="ml-0 md:ml-64 transition-all duration-300">
        <Header title={title} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
