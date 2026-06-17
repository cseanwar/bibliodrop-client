import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import TopLibrarians from "./components/TopLibrarians";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <Banner />
      <TopLibrarians />
    </div>
  );
}
