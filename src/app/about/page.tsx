import React from "react";
import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Us | Crisp Cleaning",
  description:
    "Learn about our 10+ years of experience and our commitment to cleaner futures.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutClient />
    </main>
  );
}
