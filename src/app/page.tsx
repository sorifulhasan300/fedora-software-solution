import { CoreServices } from "@/components/Module/CoreService";
import { FeaturedWork } from "@/components/Module/Featuredwork";
import { OurProcess } from "@/components/Module/Ourprocess";
import { Hero } from "@/components/Module/hero";
import { TechStackShowcase } from "@/components/Module/TechStack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fedora Software Solution — E-Commerce Engineering Agency",
  description:
    "We build high-performance e-commerce storefronts, SaaS platforms, and edutech systems for ambitious businesses worldwide. Start your project today.",
};

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <CoreServices />
      <FeaturedWork />
      <OurProcess />
      <TechStackShowcase />
    </main>
  );
}
