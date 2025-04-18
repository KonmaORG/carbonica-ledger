import { AuthProvider } from "@/contexts/AuthContext";
import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          {/* <Toaster /> */}
          <Sonner />
        </AuthProvider>
      </body>
    </html>
  );
}
