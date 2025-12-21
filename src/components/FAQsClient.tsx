"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useScrollScale from "@/hooks/useScrollScale";
import { cn } from "@/lib/utils";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: "booking" | "safety";
}

interface FAQsClientProps {
  data: FAQItem[];
}

const FAQsClient = ({ data }: FAQsClientProps) => {
  const { ref: FAQsContentRef, style: FAQsContentStyle } = useScrollScale({
    threshold: 0.1,
  });
  const { ref: ctaRef, style: ctaStyle } = useScrollScale({ threshold: 0.1 });

  const [activeTab, setActiveTab] = useState<"booking" | "safety">("booking");

  const currentFAQs = data.filter((faq) => faq.category === activeTab);

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <ParallaxBubbles />

        <section className="relative min-h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent z-0" />

          <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />

          <Navbar />

          <div className="relative z-10 container mx-auto px-6 pt-40 pb-20 text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20 animate-fade-up">
              Have a Question?
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white drop-shadow-md animate-fade-up"
              style={{ animationDelay: "100ms" }}>
              Frequently Asked Questions
            </h1>
            <p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up font-medium"
              style={{ animationDelay: "200ms" }}>
              Explore the answers to these frequently asked questions to learn
              more about how we can make your cleaning experience smooth and
              hassle-free.
            </p>
          </div>
        </section>

        <section className="relative py-20 -mt-10 mb-auto">
          <div
            ref={FAQsContentRef as React.RefObject<HTMLDivElement>}
            style={FAQsContentStyle}
            className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-center items-center mb-12 border-b border-border/40">
                <button
                  onClick={() => setActiveTab("booking")}
                  className={cn(
                    "px-10 py-4 text-lg font-bold transition-colors relative w-full sm:w-auto text-center",
                    activeTab === "booking"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}>
                  Booking & Services
                  {activeTab === "booking" && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("safety")}
                  className={cn(
                    "px-10 py-4 text-lg font-bold transition-colors relative w-full sm:w-auto text-center",
                    activeTab === "safety"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}>
                  Safety & Satisfaction
                  {activeTab === "safety" && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full" />
                  )}
                </button>
              </div>

              <div key={activeTab} className="h-auto w-full">
                <Accordion type="single" collapsible className="space-y-4">
                  {currentFAQs.length > 0 ? (
                    currentFAQs.map((faq, index) => (
                      <AccordionItem
                        key={faq._id}
                        value={faq._id}
                        className={cn(
                          "bg-card border border-border/50 rounded-xl px-6 shadow-sm hover:shadow-md transition-all duration-300",
                          "animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}>
                        <AccordionTrigger className="text-left font-semibold text-foreground/90 hover:text-primary py-6 text-lg hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-10 bg-card/50 rounded-xl border border-dashed border-border animate-in fade-in zoom-in-95 duration-300">
                      No questions found for this category.
                    </div>
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            style={ctaStyle}
            className="container mx-auto px-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-12 md:p-20 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Seeking Further Assistance?
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Click on the links below to explore additional resources or to
                  get in touch with us directly
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-card text-foreground hover:bg-card/90 shadow-xl">
                    Get a Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-card text-foreground hover:bg-card/90 shadow-xl">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default FAQsClient;
