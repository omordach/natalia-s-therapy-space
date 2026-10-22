import { describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/components/Contact";
import pl from "@/locales/pl.json";
import { renderWithProviders } from "./render";

async function fillAndSubmit() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(pl.contact.form.name), "Jan");
  await user.type(screen.getByLabelText(pl.contact.form.email), "jan@example.com");
  await user.type(screen.getByLabelText(pl.contact.form.phone), "123");
  await user.type(screen.getByLabelText(pl.contact.form.message), "Dzień dobry");
  await user.click(screen.getByRole("button", { name: pl.contact.form.submit }));
}

describe("Contact form", () => {
  it("posts a Netlify Forms submission and resets on success", async () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("pl-PL");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("", { status: 200 }));
    renderWithProviders(<Contact />);

    await fillAndSubmit();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/");
    expect(init?.method).toBe("POST");
    expect((init?.headers as Record<string, string>)["Content-Type"]).toBe("application/x-www-form-urlencoded");
    const body = new URLSearchParams(init?.body as string);
    expect(Object.fromEntries(body)).toEqual({
      "form-name": "contact",
      "bot-field": "",
      name: "Jan",
      email: "jan@example.com",
      phone: "123",
      message: "Dzień dobry",
    });

    expect(await screen.findByText(pl.contact.toast.successTitle)).toBeInTheDocument();
    expect(screen.getByLabelText(pl.contact.form.name)).toHaveValue("");
    expect(screen.getByLabelText(pl.contact.form.message)).toHaveValue("");
  });

  it("disables the button while submitting", async () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("pl-PL");
    let resolve!: (r: Response) => void;
    vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise<Response>((r) => (resolve = r)));
    renderWithProviders(<Contact />);

    await fillAndSubmit();
    const button = screen.getByRole("button", { name: pl.contact.form.submit });
    expect(button).toBeDisabled();

    resolve(new Response("", { status: 200 }));
    await waitFor(() => expect(button).toBeEnabled());
  });

  it.each([
    ["a non-OK response", () => Promise.resolve(new Response("", { status: 500 }))],
    ["a network error", () => Promise.reject(new TypeError("offline"))],
  ])("shows an error toast and keeps the input on %s", async (_, impl) => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("pl-PL");
    vi.spyOn(globalThis, "fetch").mockImplementation(impl);
    renderWithProviders(<Contact />);

    await fillAndSubmit();

    expect(await screen.findByText(pl.contact.toast.errorTitle)).toBeInTheDocument();
    expect(screen.getByLabelText(pl.contact.form.name)).toHaveValue("Jan");
    expect(screen.getByRole("button", { name: pl.contact.form.submit })).toBeEnabled();
  });
});
