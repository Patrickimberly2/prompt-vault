import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import PromptDetail from "./pages/PromptDetail";
import Collections from "./pages/Collections";
import AITools from "./pages/AITools";
import Learning from "./pages/Learning";
import Challenge from "./pages/Challenge";
import Workspace from "./pages/Workspace";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SeedDatabase from "./pages/SeedDatabase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/prompts/:id" element={<PromptDetail />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<Collections />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/seed" element={<SeedDatabase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
