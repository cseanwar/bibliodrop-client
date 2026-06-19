import { Toaster } from "react-hot-toast";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";

export const metadata = {
  title: "BiblioDrop | Online Book Delivery Management System",
  description:
    "Browse, discover, purchase and order books for the finest premium books at your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <main className="grow flex flex-col bg-zinc-50 font-sans dark:bg-black">
          <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}