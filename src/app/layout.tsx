import { AuthProvider } from "@/contexts/AuthContext";
import "./global.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/layout/Footer";
import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { VerificationProvider } from "@/contexts/VerificationContext";
import CardanoProvider from "@/contexts/cardanoProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <CardanoProvider>
            <AuthProvider>
              <VerificationProvider>
                <div className="min-h-screen flex flex-col">
                  <NavigationMenu />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </VerificationProvider>
              <Sonner />
            </AuthProvider>
          </CardanoProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
