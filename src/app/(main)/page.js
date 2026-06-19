import Banner from "@/components/Banner";
import PopularCategories from "@/components/PopularCategories";
import TopLibrarians from "@/components/TopLibrarians";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <PopularCategories />
      <TopLibrarians />
      <WhyChooseUs />
    </div>
  );
}
