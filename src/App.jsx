import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/TopicPages/Index";
import NotFound from "./components/TopicPages/NotFound";
import SortingPage from "./components/TopicPages/SortingPage";
import ArrayPage from "./components/TopicPages/ArrayPage";
import GraphPage from "./components/TopicPages/GraphPage";
import TreePage from "./components/TopicPages/TreePage";
import LinkedListPage from "./components/TopicPages/LinkedListPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sorting" element={<SortingPage />} />
            <Route path="/array" element={<ArrayPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/tree" element={<TreePage />} />
            <Route path="/linked-list" element={<LinkedListPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
