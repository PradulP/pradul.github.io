// src/hooks/useScrollReveal.js
import { useEffect } from "react";

export default function useScrollReveal(selector = ".reveal", { root = null, rootMargin = "0px 0px -10% 0px", threshold = 0.1 } = {}) {
  useEffect(() => {
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [selector, root, rootMargin, threshold]);
}
