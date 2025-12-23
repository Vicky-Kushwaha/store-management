import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner"
import { GlobalProvider } from "./providers/GlobalProvider";

export const metadata = {
  title: "Store Management App",
  description: "Store, Product, Track product location, low stock alert, top selling product",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
             {children}
        </GlobalProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
