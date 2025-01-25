import Advantages from "@/components/Landings/main/advantages";
import DropdownList from "@/components/Landings/main/dropdownlist";
import Feature from "@/components/Landings/main/feuture";
import Footer from "@/components/Landings/main/footer";
import GlobalNetworkSection from "@/components/Landings/main/globalnetwork";
import Hero from "@/components/Landings/main/hero";
import Navbar from "@/components/Landings/main/navbar";
import Pricing from "@/components/Landings/main/pricing2";
import Testimonials from "@/components/Landings/main/testimonials";
import Timeline2 from "@/components/Landings/main/timeline";








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
