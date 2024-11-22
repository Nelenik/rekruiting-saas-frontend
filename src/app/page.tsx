import Hero from "@/components/hero";
import Navbar from "@/components/navbar";




export default function Home() {
  return (
    <div className="">
      <main className="">
          <Navbar />
          <Hero />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
