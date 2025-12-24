import React, { useEffect, useRef, useState } from "react";

interface UseScrollScaleOptions {
  threshold?: number;
  scaleAmount?: number;
}

export const useScrollScale = (options: UseScrollScaleOptions = {}) => {
  const { threshold = 0.2, scaleAmount = 0.95 } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : `scale(${scaleAmount})`,
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    willChange: "opacity, transform",
  };

  return { ref, style, isVisible };
};

export default useScrollScale;
