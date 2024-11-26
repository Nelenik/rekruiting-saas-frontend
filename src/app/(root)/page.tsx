import Advantages from "@/components/advantages";
import DropdownList from "@/components/dropdownlist";
import Feature from "@/components/feuture";
import Footer from "@/components/footer";
import GlobalNetworkSection from "@/components/globalnetwork";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing2";
import Testimonials from "@/components/testimonials";
import Timeline2 from "@/components/timeline";








export default function Home() {
  return (
    <div className="">
      <main className="">
          <Navbar />
          <Hero />
          <Feature />
          {/* <SectionsComponent /> */}
          <DropdownList />
          {/* <AboutComponent /> */}
          <Advantages />
          <Timeline2 />
          <Pricing />

          <GlobalNetworkSection />
          <Testimonials />
          <Footer />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
