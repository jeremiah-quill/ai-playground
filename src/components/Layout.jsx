// components
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
