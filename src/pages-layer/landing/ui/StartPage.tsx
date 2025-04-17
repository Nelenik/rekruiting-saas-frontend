import Advantages from "./advantages";
import DropdownList from "./dropdownlist";
import Feature from "./feuture";
import Footer from "./footer";
import GlobalNetworkSection from "./globalnetwork";
import Hero from "./hero";
import Navbar from "./navbar";
import Pricing from "./pricing2";
import Testimonials from "./testimonials";
import Timeline from "./timeline";

export const StartPage = () => {
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
        <Timeline />
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
