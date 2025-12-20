import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Crisp Cleaning Melbourne",
  description:
    "Get in touch with Crisp Cleaning for professional cleaning services in Melbourne. Request a free quote or ask us any questions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
