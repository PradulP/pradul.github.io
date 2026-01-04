// src/components/FeaturedSection.jsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProjectImageCarousel from "./ProjectImageCarousel";

export default function FeaturedSection({ projects = [], maxItems = 6 }) {
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageErrorFor, setImageErrorFor] = useState(null);

  /* ================= FEATURED LIST ================= */

  const featuredList = useMemo(() => {
    const home = projects.filter(p => p.homeFeatured);
    if (home.length) return home.slice(0, maxItems);

    const civil = projects.filter(p =>
      String(p.category).toLowerCase().includes("civil")
    );
    if (civil.length) return civil.slice(0, maxItems);

    return projects.slice(0, maxItems);
  }, [projects, maxItems]);

  const selected = featuredList[selectedIndex] || null;

  /* ================= MODEL HANDLING ================= */

  const getModelSrc = (project) => {
    if (!project) return null;

    if (project.model && typeof project.model === "object") {
      return project.model.src || null;
    }

    if (typeof project.model === "string") {
      return project.model.startsWith("/")
        ? project.model
        : `/${project.model}`;
    }

    return null;
  };

  const modelSrc = getModelSrc(selected);

  /* ================= IMAGE FALLBACK ================= */

  const thumbSrc =
    selected?.image ||
    selected?.images?.[0] ||
    "/placeholder-project.webp";

  const hasYoutube =
    selected?.links?.demo &&
    (selected.links.demo.includes("youtube.com") ||
      selected.links.demo.includes("youtu.be"));

  /* ================= UI HELPERS ================= */

  function iconInitials(title = "") {
    return title
      .split(" ")
      .slice(0, 2)
      .map(w => w[0])
      .join("")
      .toUpperCase();
  }

  return (
    <section className="mb-10">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="grid md:grid-cols-12 gap-6">

          {/* ================= LEFT LIST ================= */}
          <aside className="md:col-span-4">
            <p className="text-xs text-slate-400 mb-2">Featured projects</p>

            <div
              ref={containerRef}
              className="rounded-md border border-slate-800 bg-slate-900/60 p-2 space-y-3"
            >
              {featuredList.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setImageErrorFor(null);
                  }}
                  className={`w-full text-left p-3 rounded-md flex gap-3 transition ${
                    idx === selectedIndex
                      ? "border-2 border-sky-500 bg-slate-900/80"
                      : "border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-xs border border-slate-700">
                    {iconInitials(p.title)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100 line-clamp-2">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {p.summary || p.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <Link
              to="/projects"
              className="inline-block mt-3 text-xs text-sky-400 hover:underline"
            >
              See all projects →
            </Link>
          </aside>

          {/* ================= PREVIEW ================= */}
 {/* ================= PREVIEW ================= */}
<div className="md:col-span-8">
  <div className="rounded-md bg-slate-800 overflow-hidden">

    {/* 3D MODEL OR IMAGE FALLBACK */}
    {modelSrc ? (
      <model-viewer
        src={modelSrc}
        camera-controls
        auto-rotate
        style={{ width: "100%", height: "360px" }}
      />
    ) : selected?.images?.length > 0 ? (
      <ProjectImageCarousel images={selected.images} height="360px" />
    ) : selected?.image ? (
      <img
        src={selected.image}
        alt={selected.title}
        className="w-full h-[360px] object-cover"
      />
    ) : (
      <div className="flex items-center justify-center h-[360px] text-slate-400">
        No preview available
      </div>
    )}

  </div>

            {/* DESCRIPTION */}
            <div className="mt-4 rounded-md border border-slate-800 bg-slate-900/60 p-4 max-h-[140px] overflow-auto">
              <h3 className="font-semibold text-slate-100">
                {selected?.title}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {selected?.summary || selected?.description}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex flex-wrap gap-3">
              {modelSrc && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-sky-500 text-slate-900 font-medium"
                >
                  View
                </button>
              )}

              <Link
                to={`/projects/${selected?.id}`}
                className="px-5 py-2 rounded-full border border-slate-700 text-slate-200"
              >
                Open project
              </Link>

              {hasYoutube && (
                <a
                  href={selected.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 rounded-full border border-red-500/70 text-red-400"
                >
                  Open YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODEL MODAL ================= */}
      {modalOpen && modelSrc && (
        <div className="fixed inset-0 z-50">

          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setModalOpen(false)}
          />

          {/* MODAL */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-[90vw] h-[85vh] bg-slate-900 rounded-xl overflow-hidden border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 z-50 px-3 py-1 text-xs border border-slate-700 rounded bg-slate-800 text-slate-200"
              >
                ✕ Close
              </button>

              {/* MODEL */}
              <model-viewer
                src={modelSrc}
                camera-controls
                auto-rotate
                style={{ width: "100%", height: "100%" }}
              />

              {/* OVERLAY DETAILS */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-slate-100 font-semibold">
                  {selected.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {selected.summary}
                </p>

                <Link
                  to={`/projects/${selected.id}`}
                  className="inline-block mt-2 text-xs px-4 py-1.5 rounded-full bg-sky-500 text-slate-900"
                >
                  View more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
