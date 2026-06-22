import "./globals.css";

import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/providers/ThemeProvider";

export const metadata = {
  metadataBase: new URL(
    "https://your-vercel-domain.vercel.app"
  ),

  title: {
    default:
      "BiblioDrop | Online Book Delivery Management System",
    template: "%s | BiblioDrop",
  },

  description:
    "Browse, discover, request delivery, review books, and manage library operations through BiblioDrop.",

  keywords: [
    "books",
    "library",
    "book delivery",
    "online library",
    "book management",
    "bibliodrop",
    "reading",
    "book reviews",
  ],

  authors: [
    {
      name: "BiblioDrop",
    },
  ],

  creator: "BiblioDrop",

  openGraph: {
    title:
      "BiblioDrop | Online Book Delivery Management System",

    description:
      "Browse, discover, request delivery, and review books online.",

    url: "https://your-vercel-domain.vercel.app",

    siteName: "BiblioDrop",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BiblioDrop",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "BiblioDrop | Online Book Delivery Management System",

    description:
      "Browse, discover, request delivery, and review books online.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}