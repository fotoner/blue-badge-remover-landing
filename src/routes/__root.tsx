import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { I18nProvider } from "../hooks/useI18n";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <I18nProvider>
      <ScrollRestoration />
      <Header />
      <main className="pt-14">
        <Outlet />
      </main>
      <Footer />
    </I18nProvider>
  );
}
