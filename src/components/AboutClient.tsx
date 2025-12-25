"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MissionStorySection } from "@/components/MissionStorySection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";

const getNumberStrip = (
  target: number,
  start: number,
  direction: "up" | "down"
) => {
  const strip: number[] = [];
  let current = start;
  strip.push(current);
  const needsFullLoop = start === target;
  do {
    if (direction === "up") {
      current = current === 9 ? 0 : current + 1;
    } else {
      current = current === 0 ? 9 : current - 1;
    }
    strip.push(current);
  } while (needsFullLoop ? current !== start : current !== target);
  if (needsFullLoop && current !== target) {
    strip.push(target);
  }
  return strip;
};

const RollingDigit = ({
  char,
  index,
  delay,
  controls,
}: {
  char: string;
  index: number;
  delay: number;
  controls: any;
}) => {
  if (isNaN(Number(char))) {
    return (
      <span className="h-[1em] flex items-center text-primary">{char}</span>
    );
  }
  const target = Number(char);
  const start = index % 2 === 0 ? 0 : 9;
  const direction = start === 0 ? "up" : "down";
  const strip =
    direction === "down"
      ? getNumberStrip(target, start, direction).reverse()
      : getNumberStrip(target, start, direction);
  const ITEM_HEIGHT = 1;
  const travel = (strip.length - 1) * ITEM_HEIGHT;
  const finalY = direction === "up" ? -travel : travel;

  return (
    <div className="relative h-[1em] w-[0.50em] overflow-hidden inline-block">
      <motion.div
        initial={{ y: 0 }}
        animate={controls}
        custom={{ finalY, delay }}
        className={`absolute left-0 w-full ${direction === "up" ? "top-0" : "bottom-0"}`}>
        {strip.map((n, i) => (
          <div
            key={i}
            className="h-[1em] flex items-center justify-center leading-none">
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const StatCard = ({
  number,
  label,
  delay = 0,
  controls,
}: {
  number: string;
  label: string;
  delay?: number;
  controls: any;
}) => {
  const chars = number.split("");
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-h-[100px] shadow-lg">
      <div className="text-4xl font-display font-bold leading-none flex tabular-nums">
        {chars.map((char, index) => (
          <RollingDigit
            key={index}
            char={char}
            index={index}
            delay={delay + index * 0.12}
            controls={controls}
          />
        ))}
      </div>
      <p className="text-muted-foreground font-medium text-lg mt-3">{label}</p>
    </div>
  );
};

const AboutClient = () => {
  const stats = [
    { number: "10+", label: "Years of experience" },
    { number: "10+", label: "Amazing customers" },
    { number: "300+", label: "Hours of cleaning" },
    { number: "100+", label: "Projects done" },
  ];

  const controls = useAnimationControls();

  React.useEffect(() => {
    controls.start((custom) => ({
      y: ["0em", `${custom.finalY}em`],
      transition: {
        delay: custom.delay,
        duration: 2,
        ease: [0.25, 1, 0.5, 1],
        times: [0, 0.85, 1],
      },
    }));
  }, [controls]);

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
        <section className="relative min-h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent z-0" />

          <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />

          <Navbar />

          <div className="relative z-10 container mx-auto px-6 pt-40 pb-20 text-center">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20 animate-fade-up">
              Who We Are
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white drop-shadow-md animate-fade-up"
              style={{ animationDelay: "100ms" }}>
              About Crisp Cleaning
            </h1>
            <p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up font-medium"
              style={{ animationDelay: "200ms" }}>
              Learn more about our journey, our values, and the team dedicated
              to making your space shine.
            </p>
          </div>
        </section>

        {/* --- ROLLING STATS SECTION --- */}
        <section className="relative py-24 overflow-hidden bg-background">
          <ParallaxBubbles />

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C42]/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
              {/* LEFT: Headline */}
              <div className="max-w-xl relative z-30">
                <span className="inline-block px-6 py-2 bg-[#FF8C42] text-white text-sm font-semibold rounded-full mb-6 shadow-md">
                  Our Journey
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground">
                  Creating A{" "}
                  <span className="text-primary">Cleaner Future</span> Through
                  Our Reliable Services
                </h2>
              </div>

              {/* RIGHT: Stats Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 relative z-20">
                {stats.map((stat, i) => (
                  <StatCard
                    key={i}
                    number={stat.number}
                    label={stat.label}
                    delay={i * 0.15}
                    controls={controls}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <MissionStorySection />

        <BeforeAfterSection />

        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-12 md:p-20 overflow-hidden shadow-2xl text-center">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Ready to experience the difference?
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Join hundreds of satisfied customers who have reclaimed their
                  time and space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/#services">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-xl">
                      Get a Quote <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-xl">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutClient;
