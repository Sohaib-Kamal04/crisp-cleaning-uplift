"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Mail,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import useScrollScale from "@/hooks/useScrollScale";
import Link from "next/link";


const ContactPage = () => {
  const { ref: contactContentRef, style: contactContentStyle } = useScrollScale(
    { threshold: 0.1 }
  );
  const { ref: ctaRef, style: ctaStyle } = useScrollScale({ threshold: 0.1 });

  return (
    <>
      <div className="min-h-screen bg-background">
        <ParallaxBubbles />

        {/* Hero Section */}
        <section className="relative min-h-[60vh] overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent z-0" />

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />

          {/* Navbar */}
          <Navbar />

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 pt-40 pb-20 text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20 animate-fade-up">
              Get In Touch
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white drop-shadow-md animate-fade-up"
              style={{ animationDelay: "100ms" }}>
              Communication is everything
            </h1>
            <p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up font-medium"
              style={{ animationDelay: "200ms" }}>
              We have a record of answering everything in 24 hours or less.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="relative py-20 -mt-10">
          <div
            ref={contactContentRef as React.RefObject<HTMLDivElement>}
            style={contactContentStyle}
            className="container mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info Cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* 1. Hours Card */}
                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        We're here to help
                      </p>
                      <div className="text-foreground font-medium space-y-1">
                        <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Email Card */}
                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        We'll respond within 24 hours
                      </p>
                      <a
                        href="mailto:crispcleaningmelbourne@outlook.com"
                        className="text-primary font-medium hover:underline break-all">
                        crispcleaningmelbourne@outlook.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Phone Card */}
                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Call Us</h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        Mon-Fri from 8am to 5pm
                      </p>
                      <a
                        href="tel:+61451433786"
                        className="text-primary font-medium hover:underline">
                        +61 451 433 786
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Socials Card */}
                <div className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Socials</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Follow us on social media
                      </p>

                      <div className="flex items-center gap-3">
                        <a
                          href="#"
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary group"
                          aria-label="Instagram">
                          <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                          href="#"
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary group"
                          aria-label="Facebook">
                          <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                        <a
                          href="#"
                          className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors text-primary group"
                          aria-label="LinkedIn">
                          <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/50">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                      Send us a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you shortly.
                    </p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          First Name
                        </label>
                        <Input
                          placeholder="John"
                          className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Last Name
                        </label>
                        <Input
                          placeholder="Doe"
                          className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+61 400 000 000"
                        className="h-14 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us about your cleaning needs..."
                        className="min-h-[160px] rounded-xl resize-none bg-background/50 border-border/50 focus:border-primary transition-colors"
                      />
                    </div>

                    <Button
                      variant="hero"
                      size="xl"
                      className="w-full shadow-xl shadow-primary/20">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                  Experience the Difference
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Ready to transform your space? Get a free, no-obligation quote
                  today and see why Melbourne trusts Crisp Cleaning.
                </p>
                 <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    as="div"
                    variant="secondary"
                    size="xl"
                    className="bg-card text-foreground hover:bg-card/90 shadow-xl">
                    Get a Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                 </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
