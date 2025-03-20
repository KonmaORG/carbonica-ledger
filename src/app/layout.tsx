import WalletProvider from "@/context/walletProvider";
import "./global.css";
import { NavigationMenu } from "@/components/navigation/NavigationMenu";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <NavigationMenu />
          <div className="container mx-auto px-4 py-8">{children}</div>
          {/* <Toaster /> */}
          <Sonner />
        </WalletProvider>
      </body>
    </html>
  );
}
