import { CoreServices } from "@/components/Module/CoreService";
import { FeaturedWork } from "@/components/Module/Featuredwork";
import { Navbar } from "@/components/Module/Navbar";
import { OurProcess } from "@/components/Module/Ourprocess";
import { Hero } from "@/components/Module/hero";
import { TechStackShowcase } from "@/components/Module/TechStack";
import { Careers } from "@/components/Module/Careers";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col">
        <Hero />
        <CoreServices />
        <FeaturedWork />
        <OurProcess />
        <TechStackShowcase />
        <Careers />
      </main>
    </>
  );
}
