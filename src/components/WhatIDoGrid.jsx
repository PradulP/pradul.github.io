// src/components/WhatIDoGrid.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * WhatIDoGrid
 * Props:
 *  - items: [{ title: string, items: [string] }]
 */
export default function WhatIDoGrid({ items = [] }) {
  const container = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }
  };
  const card = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    <section className="mb-10">
      {/* <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">What I do</h2>
        
      </div> */}

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={container} className="grid gap-4 md:grid-cols-3 mt-4">
        {items.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-slate-400">No items yet.</div>
        )}
        {items.map((group, idx) => (
          <motion.article key={idx} variants={card} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:scale-[1.01] transition hover:border-sky-500/60">
            <h3 className="text-sm font-semibold text-slate-100 mb-2">{group.title}</h3>
            <ul className="text-[13px] text-slate-300 list-disc list-inside space-y-1">
              {(group.items || []).map((it, i) => (
                <li key={i} className="hover:text-sky-300 transition">{it}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
