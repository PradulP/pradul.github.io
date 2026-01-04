// src/components/BlogPreview.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Small blog preview used on Home. Mirrors blog page content.
 * Props:
 *   posts: array of blog/pieces with { id, title, summary, content, date, readTime, tag, status, url }
 */
export default function BlogPreview({ posts = [] }) {
  const list = posts && posts.length ? posts : [];
  const [selected, setSelected] = useState(null);

  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "2-digit" });
    } catch {
      return iso;
    }
  };

  const statusBadge = (status) => {
    if (status === "published") return <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 text-[11px]">Live</span>;
    if (status === "draft") return <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 text-[11px]">Draft</span>;
    return <span className="inline-flex items-center rounded-full bg-slate-500/10 text-slate-300 border border-slate-500/40 px-2.5 py-0.5 text-[11px]">Coming soon</span>;
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold text-slate-100">Latest note</h3>
        <Link to="/blog" className="text-xs text-sky-400 hover:underline">View all notes →</Link>
      </div>

      <div className="mt-4">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-slate-400">No notes yet — check back soon.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {list.slice(0, 2).map(p => (
              <article key={p.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-sky-500/60 hover:-translate-y-0.5 transition cursor-pointer" onClick={() => setSelected(p)}>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                  <span>{p.tag}</span>
                  <div className="flex items-center gap-2">
                    {p.date && <span>{formatDate(p.date)}</span>}
                    {p.readTime && <span>• {p.readTime}</span>}
                    {statusBadge(p.status)}
                  </div>
                </div>
                <h4 className="font-semibold text-slate-100">{p.title}</h4>
                <p className="text-sm text-slate-300 mt-2 line-clamp-3">{p.summary}</p>
                <div className="mt-3 text-xs text-sky-400">Read here →</div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 md:p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">{selected.tag}</p>
                <h2 className="text-xl font-semibold text-slate-100">{selected.title}</h2>
                <div className="text-[11px] text-slate-400 mt-1">{formatDate(selected.date)} {selected.readTime && <>• {selected.readTime}</>}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-100 px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-700">✕</button>
            </div>

            <div className="text-sm text-slate-200 max-h-72 overflow-y-auto pr-2">
              <p>{selected.content || selected.summary || "No content yet."}</p>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="px-4 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200">Close</button>
              {selected.url && <a href={selected.url} target="_blank" rel="noreferrer" className="px-4 py-1.5 rounded-lg bg-sky-500 text-slate-900">Open full article ↗</a>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
