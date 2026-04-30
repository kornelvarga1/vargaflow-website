import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutRoute } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import ServicePage from "./pages/ServicePage";
import Pricing from "./pages/Pricing";
import Trades from "./pages/Trades";
import NotFound from "./pages/NotFound";
import OnboardingForm from "./pages/OnboardingForm";
import SmsOptin from "./pages/SmsOptin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Demo from "./pages/Demo";
import HowItWorks from "./pages/HowItWorks";

const queryClient = new QueryClient();

/** App shell without Router or HelmetProvider — used by both client and prerender */
export const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Standalone pages — no nav/footer */}
        <Route path="/onboarding-form" element={<OnboardingForm />} />
        <Route path="/sms-optin" element={<SmsOptin />} />
        {/* All other pages use the standard Layout */}
        <Route element={<LayoutRoute />}>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          {/* Canonical legal paths (used in TCR / A2P submissions). /terms and /privacy
              are kept as aliases so any pre-existing links don't break. */}
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
