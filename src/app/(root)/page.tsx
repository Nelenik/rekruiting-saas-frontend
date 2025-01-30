import Advantages from "@/components/landings/main/advantages";
import DropdownList from "@/components/landings/main/dropdownlist";
import Feature from "@/components/landings/main/feuture";
import Footer from "@/components/landings/main/footer";
import GlobalNetworkSection from "@/components/landings/main/globalnetwork";
import Hero from "@/components/landings/main/hero";
import Navbar from "@/components/landings/main/navbar";
import Pricing from "@/components/landings/main/pricing2";
import Testimonials from "@/components/landings/main/testimonials";
import Timeline2 from "@/components/landings/main/timeline";








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
