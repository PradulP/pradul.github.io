import { Link } from "react-router-dom";
import content from "../content.json";

export default function Hero({ hero, location }) {
  const currentRole = content.experience.find((e) => e.isCurrent);

  return (
    <section className="mb-12 md:mb-16">
      <div className="max-w-3xl rounded-3xl border border-slate-800 
        bg-slate-900/60 backdrop-blur-xl p-5 md:p-7 
        shadow-[0_0_80px_rgba(56,189,248,0.15)]"
      >

        {/* Status */}
        {hero.status && (
          <p className="inline-flex items-center gap-2 text-xs md:text-sm text-slate-300 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {hero.status}
          </p>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
          Hi, I&apos;m <span className="text-sky-400">{hero.name}</span>
        </h1>

        {/* Headline */}
        <p className="typing text-sm md:text-base text-sky-300 mb-2 max-w-xl">
          {hero.headline}
        </p>

        <p className="text-sm md:text-base text-slate-400 mb-5">
          {hero.tagline}
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Link
            to="/about"
            className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 
            text-sm font-medium shadow-lg shadow-sky-500/30 transition"
          >
            View full profile
          </Link>

          {hero.cvLink && (
            <a
              href={hero.cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-slate-600 
              hover:border-sky-400 text-sm font-medium"
            >
              Resume
            </a>
          )}

          <Link
            to="/projects"
            className="px-5 py-2 rounded-full border border-slate-600 
            hover:border-sky-400 text-sm font-medium"
          >
            View projects
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-slate-300">
          <div>
            <p className="text-slate-400 text-[11px] uppercase">Current Role</p>
            <p>
              {currentRole
                ? `${currentRole.role} @ ${currentRole.company}`
                : "—"}
            </p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] uppercase">Based in</p>
            <p>{location}</p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] uppercase">Focus</p>
            <p>{hero.focus}</p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] uppercase">Type</p>
            <p>Civil · BIM · Tech</p>
          </div>
        </div>
      </div>
    </section>
  );
}
