import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import { Toaster } from "@/components/ui/toaster";

export function renderWithProviders(ui: ReactElement) {
  return render(
    <LocalizationProvider>
      {ui}
      <Toaster />
    </LocalizationProvider>,
  );
}
