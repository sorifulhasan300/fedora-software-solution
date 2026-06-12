import { Navbar } from "@/components/Module/Navbar";
import { Hero } from "@/components/Module/hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
      </main>
    </>
  );
}
