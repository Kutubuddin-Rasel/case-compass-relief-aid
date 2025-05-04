
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import VictimDashboard from "./pages/VictimDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import CaseDetail from "./pages/CaseDetail";
import Documents from "./pages/Documents";
import MedicalRecords from "./pages/MedicalRecords";
import FinancialAid from "./pages/FinancialAid";
import Appointments from "./pages/Appointments";
import Notifications from "./pages/Notifications";
import ConsentForms from "./pages/ConsentForms";
import VictimProfile from "./pages/VictimProfile";
import AdminVictimManagement from "./pages/AdminVictimManagement";
import AdminVictimIntake from "./pages/AdminVictimIntake";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Victim Routes */}
          <Route path="/dashboard" element={<VictimDashboard />} />
          <Route path="/cases/:id" element={<CaseDetail />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/financial-aid" element={<FinancialAid />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/consent-forms" element={<ConsentForms />} />
          <Route path="/profile" element={<VictimProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/victims" element={<AdminVictimManagement />} />
          <Route path="/admin/intake" element={<AdminVictimIntake />} />
          <Route path="/admin/cases/:id" element={<CaseDetail isAdmin={true} />} />
          <Route path="/admin/documents" element={<Documents isAdmin={true} />} />
          <Route path="/admin/medical-records" element={<MedicalRecords isAdmin={true} />} />
          <Route path="/admin/financial-aid" element={<FinancialAid isAdmin={true} />} />
          <Route path="/admin/appointments" element={<Appointments isAdmin={true} />} />
          <Route path="/admin/notifications" element={<Notifications isAdmin={true} />} />
          <Route path="/admin/consent-forms" element={<ConsentForms isAdmin={true} />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Login />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
