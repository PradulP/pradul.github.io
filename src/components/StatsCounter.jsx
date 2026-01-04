// src/components/StatsCounter.jsx
import { useEffect, useRef, useState } from "react";

export default function StatsCounter({ from = 0, to = 100, duration = 1200, suffix = "+", label }) {
  const [value, setValue] = useState(from);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const current = Math.floor(progress * (to - from) + from);
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(to);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [from, to, duration]);

  return (
    <div className="reveal text-center p-4">
      <div className="text-2xl md:text-3xl font-bold text-slate-100">
        {value}
        <span className="text-sky-400 ml-1">{suffix}</span>
      </div>
      {label && <div className="text-xs text-slate-400 mt-1">{label}</div>}
    </div>
  );
}
