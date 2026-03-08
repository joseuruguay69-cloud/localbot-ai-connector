import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import Conversations from "./pages/dashboard/Conversations";
import Bookings from "./pages/dashboard/Bookings";
import FAQs from "./pages/dashboard/FAQs";
import ChatbotSettings from "./pages/dashboard/ChatbotSettings";
import BusinessSettings from "./pages/dashboard/BusinessSettings";
import Billing from "./pages/dashboard/Billing";
import SettingsPage from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="conversations" element={<Conversations />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="chatbot" element={<ChatbotSettings />} />
            <Route path="business" element={<BusinessSettings />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
