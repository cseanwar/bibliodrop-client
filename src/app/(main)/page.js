import Banner from "@/components/Banner";
import FeaturedBooks from "@/components/FeaturedBooks";
import PopularCategories from "@/components/PopularCategories";
import TopLibrarians from "@/components/TopLibrarians";
import WhyChooseUs from "@/components/WhyChooseUs";

export default async function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Banner />
      <FeaturedBooks/>
      <PopularCategories />
      <TopLibrarians />
      <WhyChooseUs />
    </div>
  );
}
