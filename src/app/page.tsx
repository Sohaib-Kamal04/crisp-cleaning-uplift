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

import { client } from "@/sanity/lib/client";

export default async function Home() {
  const [faqsData, reviewsData] = await Promise.all([
    client.fetch(
      `*[_type == "faq"] | order(order asc) { _id, question, answer,category }`,
      {},
      { next: { revalidate: 0 } }
    ),
    client.fetch(
      `*[_type == "review" && featured == true] { 
      _id, 
      name, 
      role, 
      content, 
      rating, 
      avatarInitials 
    }`,
      {},
      { next: { revalidate: 0 } }
    ),
  ]);
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <ParallaxBubbles />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <HowWeWork />
      <Reviews data={reviewsData} />
      <FAQs data={faqsData} />
      <Contact />
      <Footer />
    </main>
  );
}
