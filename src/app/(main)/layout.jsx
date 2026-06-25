import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "BiblioDrop | Online Book Delivery Management System",
  description:
    "Browse, discover, purchase and order books for the finest premium books at your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="grow flex flex-col bg-zinc-50 font-sans dark:bg-black">{children}</div>
      <Footer />
    </div>
  );
}
