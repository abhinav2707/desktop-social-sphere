
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import Search from "./components/Search";
import Create from "./components/Create";
import Messages from "./components/Messages";
import Profile from "./components/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard currentUser={{ name: "John Doe", username: "johndoe" }} onLogout={() => window.location.href = "/"} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create onClose={() => window.history.back()} />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile currentUser={{ name: "John Doe", username: "johndoe" }} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
