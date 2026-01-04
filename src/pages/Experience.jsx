import { useState } from "react";
import content from "../content.json";
import SectionTitle from "../components/SectionTitle";


function getEndYear(item) {
  const text = item.period || item.years || "";
  if (text.toLowerCase().includes("present")) return 9999;
  const match = text.match(/\d{4}/g);
  return match ? Number(match[match.length - 1]) : 0;
}

export default function Experience() {
  const { experience = [], education = [] } = content;

  const [tab, setTab] = useState("experience"); // "experience" | "education"

  const items =
  tab === "experience"
    ? [...experience]
        .sort((a, b) => getEndYear(b) - getEndYear(a))
        .map((e) => ({ ...e, kind: "experience" }))
    : [...education]
        .sort((a, b) => getEndYear(b) - getEndYear(a))
        .map((e) => ({ ...e, kind: "education" }));

  return (
    <main className="pt-8 md:pt-10 pb-16">
      {/* Header + tab buttons */}
      <section className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <SectionTitle>
            {tab === "experience" ? "Experience" : "Education"} Timeline
          </SectionTitle>

          <div className="flex gap-2 text-xs md:text-sm">
            <button
              type="button"
              onClick={() => setTab("experience")}
              className={`px-3 py-1.5 rounded-full border transition ${
                tab === "experience"
                  ? "border-sky-500 text-sky-300 bg-sky-500/10"
                  : "border-slate-700 text-slate-300 hover:border-sky-500/60"
              }`}
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => setTab("education")}
              className={`px-3 py-1.5 rounded-full border transition ${
                tab === "education"
                  ? "border-sky-500 text-sky-300 bg-sky-500/10"
                  : "border-slate-700 text-slate-300 hover:border-sky-500/60"
              }`}
            >
              Education
            </button>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
          A timeline view from{" "}
          <span className="text-slate-200">present to past</span>, showing my{" "}
          {tab === "experience"
            ? "roles, internships and practical exposure."
            : "academic path and related milestones."}
        </p>
      </section>

      {/* Desktop timeline (2 in a row with center line) */}
      <section className="hidden md:block">
        <DesktopTimeline items={items} />
      </section>

      {/* Mobile simple timeline */}
      <section className="md:hidden">
        <MobileTimeline items={items} />
      </section>
    </main>
  );
}

/* ================= DESKTOP TIMELINE ================= */

function DesktopTimeline({ items }) {
  if (!items.length) {
    return (
      <p className="text-sm text-slate-400">
        Timeline data will be added here soon.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const isLeft = index % 2 === 0; // alternate L/R
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            className="grid grid-cols-[1fr_auto_1fr] gap-8 items-stretch"
          >
            {/* Left card */}
            <div className={isLeft ? "" : "opacity-0 pointer-events-none"}>
              {isLeft && <TimelineCard item={item} align="right" />}
            </div>

            {/* Center line + dot */}
            <div className="flex flex-col items-center">
              {!isFirst && <div className="w-px flex-1 bg-slate-800" />}
              <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
              {!isLast && <div className="w-px flex-1 bg-slate-800" />}
            </div>

            {/* Right card */}
            <div className={!isLeft ? "" : "opacity-0 pointer-events-none"}>
              {!isLeft && <TimelineCard item={item} align="left" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================= MOBILE TIMELINE ================= */

function MobileTimeline({ items }) {
  return (
    <div className="relative border-l border-slate-800 pl-4 space-y-6">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[9px] top-1">
            <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
          </div>
          <div className="ml-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
            <TimelineCardInner item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= CARD COMPONENTS ================= */

function TimelineCard({ item, align }) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs md:text-sm text-slate-300 max-w-xl ${
        align === "right" ? "ml-auto" : "mr-auto"
      }`}
    >
      <TimelineCardInner item={item} />
    </div>
  );
}

function TimelineCardInner({ item }) {
  const period = item.period || item.years || "";
  const title = item.role || item.degree || item.title || "";
  const place =
    item.company || item.place || item.location || item.position || "";

  return (
    <>
    {/* {item.kind && (
  <span className="inline-block mb-1 text-[10px] px-2 py-0.5 rounded-full border border-slate-700 text-slate-300">
    {item.kind === "experience" ? "Experience" : "Education"}
  </span>
)} */}
      {period && (
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-1">
          {period}
        </p>
      )}

      <h4 className="text-sm md:text-base font-semibold text-slate-100 mb-0.5">
        {title}
      </h4>

      {place && (
        <p className="text-[14px] text-slate-400 mb-1 whitespace-pre-line">
          {place}
        </p>
      )}

      {/* EXPERIENCE POINTS */}
      {Array.isArray(item.points) && item.points.length > 0 && (
        <ul className="list-disc list-inside space-y-1 mt-1">
          {item.points.slice(0, 4).map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      )}

      {/* EDUCATION DESCRIPTION */}
      {item.description && (
        <p className="text-xs md:text-sm text-slate-300 mt-1">
          {item.description}
        </p>
      )}

      {/* EDUCATION HIGHLIGHTS */}
     {Array.isArray(item.highlights) && item.highlights.length > 0 && (
  <ul className="list-disc list-inside space-y-1 mt-2 text-xs md:text-sm text-slate-300">
    {(window.innerWidth < 768 ? item.highlights.slice(0, 2) : item.highlights).map((h) => (
      <li key={h}>{h}</li>
    ))}
  </ul>
)}

    </>
  );
}

