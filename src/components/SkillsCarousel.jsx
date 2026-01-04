// src/components/SkillsCarousel.jsx
import { useRef } from "react";

export default function SkillsCarousel({ items = [] }) {
  const scroller = useRef(null);

  const scroll = (dx) => {
    if (scroller.current) scroller.current.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button onClick={() => scroll(-200)} className="px-2 py-1 rounded border border-slate-700">‹</button>
          <button onClick={() => scroll(200)} className="px-2 py-1 rounded border border-slate-700">›</button>
        </div>
      </div>

      <div ref={scroller} className="overflow-x-auto no-scrollbar flex gap-3 py-2 px-1">
        {items.map((s, i) => (
          <div
            key={s + i}
            tabIndex={0}
            className="min-w-[8rem] rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 transform transition hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500"
            role="button"
            aria-label={`Skill ${s}`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
