import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import FAQs from "@/components/FAQs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <ParallaxBubbles />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <HowWeWork />
      <Reviews />
      <FAQs />
      <Contact />
      <Footer />
    </main>
  );
}
