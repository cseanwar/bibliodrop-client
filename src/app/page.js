import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
    </div>
  );
}
