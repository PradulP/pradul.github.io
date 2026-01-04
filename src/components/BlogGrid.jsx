// src/components/BlogGrid.jsx
import { Link } from "react-router-dom";

export default function BlogGrid({ posts = [] }) {
  return (
    <div className="reveal grid md:grid-cols-3 gap-4">
      {posts.slice(0, 3).map((p, i) => (
        <article key={p.title ?? i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-slate-100">{p.title}</h3>
            {p.date && <time className="text-xs text-slate-400">{p.date}</time>}
          </div>
          <p className="text-slate-300 text-sm line-clamp-3">{p.summary}</p>
          <Link to={p.link || "/blog"} className="mt-3 inline-block text-xs text-sky-400 hover:underline">
            Read → 
          </Link>
        </article>
      ))}
    </div>
  );
}
