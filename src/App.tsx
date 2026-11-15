import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <LocalizationProvider>
    {/* Skip entrance/scroll animations for visitors who ask for reduced motion. */}
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </LocalizationProvider>
);

export default App;
