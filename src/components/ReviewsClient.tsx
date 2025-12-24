"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBubbles from "@/components/ParallaxBubbles";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import useScrollScale from "@/hooks/useScrollScale";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ReviewItem {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarInitials?: string;
  featured?: boolean;
  showInHero?: boolean;
  _createdAt: string;
}

interface ReviewsClientProps {
  data: ReviewItem[];
}

const getGridSpans = (index: number) => {
  const mod = index % 10;

  switch (mod) {
    case 0:
      return "md:col-span-4 md:row-span-1";

    case 5:

    case 9:
      return "md:col-span-4 md:row-span-2";

    case 2:
      return "md:col-span-4 md:row-span-2";

    default:
      return "md:col-span-4 md:row-span-1";
  }
};

const MarqueeReviewCard = ({
  review,
  className,
}: {
  review: ReviewItem;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100/50 flex-shrink-0 whitespace-normal",
      className
    )}>
    <div className="flex items-start gap-4 mb-4">
      <Avatar className="h-10 w-10 ring-2 ring-white">
        <AvatarImage
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`}
        />
        <AvatarFallback className="bg-primary/10 text-primary">
          {review.avatarInitials || review.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
        <span className="text-xs text-gray-400">{review.role}</span>
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
      "{review.content}"
    </p>
  </div>
);

const AbstractGridCard = ({
  review,
  index,
  gridClasses,
}: {
  review: ReviewItem;
  index: number;
  gridClasses: string;
}) => {
  const isBigCard = gridClasses.includes("row-span-2");

  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-[300px] md:w-auto snap-start",
        gridClasses
      )}>
      <Card
        className={cn(
          "glass-card border-none shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white/70 backdrop-blur-md relative overflow-hidden h-full flex flex-col justify-between",
          "animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both hover:-translate-y-1 hover:bg-white/90"
        )}
        style={{ animationDelay: `${(index % 9) * 100}ms` }}>
        {isBigCard ? (
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500 pointer-events-none" />
        ) : (
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none" />
        )}

        <div>
          <CardHeader className="flex flex-row items-center gap-4 pb-4 relative z-10">
            <Quote
              className={cn(
                "absolute top-2 right-2 text-primary/10 transition-all duration-500 group-hover:text-primary/20 group-hover:rotate-12",
                isBigCard ? "w-16 h-16" : "w-10 h-10"
              )}
            />
            <Avatar
              className={cn(
                "border-2 border-white shadow-sm ring-2 ring-transparent group-hover:ring-primary/20 transition-all",
                isBigCard ? "h-14 w-14" : "h-10 w-10"
              )}>
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`}
                alt={review.name}
              />
              <AvatarFallback>
                {review.avatarInitials || review.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3
                className={cn(
                  "font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1",
                  isBigCard ? "text-lg" : "text-base"
                )}>
                {review.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {review.role || "Verified Customer"}
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-0 relative z-10">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4 transition-all duration-300",
                    i < (review.rating || 5)
                      ? "fill-yellow-400 text-yellow-400 group-hover:scale-110"
                      : "fill-gray-200 text-gray-200"
                  )}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>

            <p
              className={cn(
                "text-muted-foreground leading-relaxed italic",
                isBigCard ? "text-base line-clamp-[8]" : "text-sm line-clamp-4"
              )}>
              "{review.content}"
            </p>
          </CardContent>
        </div>

        <div className="p-6 pt-0 relative z-10 mt-4">
          <span className="text-xs text-muted-foreground/60 font-medium bg-gray-100/50 px-3 py-1 rounded-full inline-block">
            {new Date(review._createdAt || Date.now()).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
              }
            )}
          </span>
        </div>
      </Card>
    </div>
  );
};

const ReviewsClient = ({ data }: ReviewsClientProps) => {
  const { ref: reviewsContentRef, style: reviewsContentStyle } = useScrollScale(
    {
      threshold: 0.05,
      scaleAmount: 1.02,
    }
  );
  const { ref: ctaRef, style: ctaStyle } = useScrollScale({ threshold: 0.1 });

  const [searchTerm, setSearchTerm] = useState("");

  const [visibleCount, setVisibleCount] = useState(10);
  const ITEMS_PER_PAGE = 10;

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerTerm) ||
        item.content.toLowerCase().includes(lowerTerm) ||
        (item.role && item.role.toLowerCase().includes(lowerTerm))
    );
  }, [data, searchTerm]);

  const visibleData = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const heroData = useMemo(() => {
    return data.filter((item) => item.showInHero !== false);
  }, [data]);

  const half = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half);

  const ensureLength = (arr: ReviewItem[]) => {
    if (!arr.length) return [];
    let res = [...arr];
    while (res.length < 10) {
      res = [...res, ...arr];
    }
    return res.slice(0, 15);
  };
  const col1 = ensureLength(firstHalf);
  const col2 = ensureLength(secondHalf);

  return (
    <>
      <style jsx global>{`
        /* Animations & Utilities */
        @keyframes scrollUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
        @keyframes scrollDown {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0%);
          }
        }
        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }

        .animate-scroll-up {
          animation: scrollUp 120s linear infinite;
        }
        .animate-scroll-down {
          animation: scrollDown 120s linear infinite;
        }
        .animate-scroll-left {
          animation: scrollLeft 120s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 120s linear infinite;
        }

        .marquee-container:hover .animate-scroll-up,
        .marquee-container:hover .animate-scroll-down,
        .marquee-container:hover .animate-scroll-left,
        .marquee-container:hover .animate-scroll-right {
          animation-play-state: paused;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
        <ParallaxBubbles />
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C42]/10 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative z-30 max-w-xl text-center lg:text-left mx-auto lg:mx-0 order-1">
                <span className="inline-block px-6 py-2 bg-[#FF8C42] text-white text-sm font-semibold rounded-full mb-6 lg:mb-8 shadow-md animate-fade-up">
                  Crisp Cleaning is for you
                </span>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 lg:mb-8 text-foreground animate-fade-up"
                  style={{ animationDelay: "100ms" }}>
                  <span className="text-[#FF8C42]">Success stories</span> from
                  real
                  <br />
                  Crisp Cleaning
                  <br />
                  customers
                </h1>
                <div
                  className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-up"
                  style={{ animationDelay: "200ms" }}>
                  <p>
                    As we showcase the results achieved through these
                    partnerships, we invite you to explore the success stories
                    that have unfolded across various industries.
                  </p>
                </div>
              </div>

              {/* Marquee Logic */}
              <div className="relative w-full order-2 marquee-container z-20">
                {/* MOBILE */}
                <div className="block lg:hidden space-y-6">
                  <div className="relative w-screen -ml-6 overflow-hidden mask-gradient-x">
                    <div className="flex gap-4 animate-scroll-left w-max pl-6">
                      {[...col1, ...col1].map((review, i) => (
                        <MarqueeReviewCard
                          key={`m-r1-${i}`}
                          review={review}
                          className="w-[280px]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative w-screen -ml-6 overflow-hidden mask-gradient-x">
                    <div className="flex gap-4 animate-scroll-right w-max pl-6 -ml-[100%]">
                      {[...col2, ...col2].map((review, i) => (
                        <MarqueeReviewCard
                          key={`m-r2-${i}`}
                          review={review}
                          className="w-[280px]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* DESKTOP */}
                <div className="hidden lg:grid grid-cols-2 gap-6 h-[650px] overflow-hidden relative mask-gradient-y-2">
                  <div className="relative h-full overflow-hidden">
                    <div className="flex flex-col gap-6 animate-scroll-up py-4">
                      {[...col1, ...col1].map((review, i) => (
                        <MarqueeReviewCard
                          key={`d-c1-${i}`}
                          review={review}
                          className="w-full"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative h-full overflow-hidden">
                    <div className="flex flex-col gap-6 animate-scroll-down -mt-[100%] py-4">
                      {[...col2, ...col2].map((review, i) => (
                        <MarqueeReviewCard
                          key={`d-c2-${i}`}
                          review={review}
                          className="w-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- MAIN REVIEWS GRID --- */}
        <section className="relative py-24 min-h-[800px]">
          <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

          <div
            ref={reviewsContentRef as React.RefObject<HTMLDivElement>}
            style={reviewsContentStyle}
            className="container mx-auto px-0 md:px-6">
            {/* Header & Search */}
            <div className="px-6 md:px-0 flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  All Client Stories
                </h2>
                <p className="text-muted-foreground text-lg">
                  Learn how Crisp Cleaning customers save time, effort and money
                </p>
              </div>

              <div className="relative w-full md:w-80 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                <div className="relative bg-background/80 backdrop-blur-md rounded-lg flex items-center px-3 border border-border/50 shadow-sm focus-within:border-primary/50 transition-colors">
                  <Search className="w-5 h-5 text-muted-foreground mr-2" />
                  <Input
                    placeholder="Search reviews..."
                    className="border-none shadow-none focus-visible:ring-0 px-0 h-12 bg-transparent placeholder:text-muted-foreground/50"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setVisibleCount(10);
                    }}
                  />
                </div>
              </div>
            </div>

            {visibleData.length > 0 ? (
              <>
                <div
                  className="
                  flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 px-6
                  md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:pb-0 md:px-0 md:grid-flow-dense
                ">
                  {visibleData.map((review, index) => {
                    const gridClasses = getGridSpans(index);
                    return (
                      <AbstractGridCard
                        key={`${review._id}-${index}`}
                        review={review}
                        index={index}
                        gridClasses={gridClasses}
                      />
                    );
                  })}
                </div>

                {hasMore && (
                  <div className="mt-8 md:mt-16 text-center px-6 md:px-0">
                    <div className="relative inline-block group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200" />
                      <Button
                        onClick={handleLoadMore}
                        size="lg"
                        className="relative bg-background hover:bg-background/90 text-foreground border border-input rounded-full px-8 h-12 font-medium">
                        Load More Stories
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Showing {visibleData.length} of {filteredData.length}{" "}
                      reviews
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="mx-6 md:mx-0 text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-sm mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No reviews found
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  We couldn't find any reviews matching "{searchTerm}". Try
                  searching for a different keyword.
                </p>
                <Button
                  variant="link"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-primary">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-16 bg-background">
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            style={ctaStyle}
            className="container mx-auto px-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-12 md:p-20 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Streamline your cleaning experience
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Your cleaning solutions are just a click away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/#services" className="w-full sm:w-auto">
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="w-full h-14 bg-card text-foreground hover:bg-card/90 shadow-xl text-lg px-8 rounded-xl">
                      <div>
                        Get a Free Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="w-full h-14 bg-card text-foreground hover:bg-card/90 shadow-xl text-lg px-8 rounded-xl">
                      <div>
                        Contact Us
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </Button>
                  </Link>
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

export default ReviewsClient;
