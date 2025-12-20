import { useEffect, useRef, useState } from "react";

interface UseScrollScaleOptions {
  threshold?: number;
}

export const useScrollScale = (options: UseScrollScaleOptions = {}) => {
  const { threshold = 0.2 } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    transition: "opacity 0.8s ease-out",
  };

  return { ref, style, isVisible };
};

export default useScrollScale;
