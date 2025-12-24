import React from "react";

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl opacity-40 -translate-y-1/2" />
        <div className="absolute bottom-40 right-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl opacity-40 translate-y-1/2" />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
