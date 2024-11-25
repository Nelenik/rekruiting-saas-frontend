import Advantages from "@/components/advantages";
import Feature from "@/components/feuture";
import GlobalNetworkSection from "@/components/globalnetwork";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing2";
import Timeline2 from "@/components/timeline";







export default function Home() {
  return (
    <div className="">
      <main className="">
          <Navbar />
          <Hero />
          <Feature />
          <Pricing />
          <Advantages />
          <Timeline2 />
          <GlobalNetworkSection />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
