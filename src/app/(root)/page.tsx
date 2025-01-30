import Advantages from "@/components/andings/main/advantages";
import DropdownList from "@/components/andings/main/dropdownlist";
import Feature from "@/components/andings/main/feuture";
import Footer from "@/components/andings/main/footer";
import GlobalNetworkSection from "@/components/andings/main/globalnetwork";
import Hero from "@/components/andings/main/hero";
import Navbar from "@/components/andings/main/navbar";
import Pricing from "@/components/andings/main/pricing2";
import Testimonials from "@/components/andings/main/testimonials";
import Timeline2 from "@/components/andings/main/timeline";








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
