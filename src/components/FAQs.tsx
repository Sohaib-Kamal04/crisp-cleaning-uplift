"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useScrollScale from "@/hooks/useScrollScale";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

interface FAQsProps {
  data: FAQItem[];
}

const FAQs = ({ data }: FAQsProps) => {
  const { ref: sectionRef, style: scaleStyle } = useScrollScale({
    threshold: 0.1,
  });

  return (
    <section
      id="faqs"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-16"
      style={scaleStyle}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Still Have <span className="text-gradient">Questions</span> To
              Answer?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Navigate to our FAQ section to find answers to common queries and
              gain a deeper understanding of how we can meet your cleaning needs
              with precision and care.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We believe in transparency and want to ensure that you have all
              the information necessary to choose us with confidence.
            </p>
            <Button variant="hero">View All FAQs</Button>
          </div>

          {/* Right Column - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {/* Map over the passed 'data' prop instead of hardcoded array */}
              {data &&
                data.map((faq, index) => (
                  <AccordionItem
                    key={faq._id}
                    value={`item-${index}`}
                    className="glass-card rounded-2xl px-6 border-none">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
