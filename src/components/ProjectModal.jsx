// src/components/ProjectModal.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState("image"); // image | model

  useEffect(() => {
    setIndex(0);
    setView("image");
  }, [project]);

  useEffect(() => {
    function onKey(e) {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(i + 1, (project.images || []).length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  const images = project.images?.length
    ? project.images
    : project.image
    ? [project.image]
    : [];

  const modelSrc =
    typeof project.model === "object"
      ? project.model?.src
      : project.model;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 max-w-6xl w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-slate-100">
              {project.title}
            </h3>
            <p className="text-xs text-slate-400">
              {project.type || project.category} {project.year && `· ${project.year}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/projects/${project.id}`}
              className="px-3 py-1 text-xs rounded border border-sky-500/60 text-sky-300"
              onClick={onClose}
            >
              View full project
            </Link>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 text-xs rounded bg-slate-800"
              >
                Open link
              </a>
            )}

            <button
              onClick={onClose}
              className="px-3 py-1 text-xs rounded border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Main viewer */}
          <div className="md:col-span-3 p-4 flex items-center justify-center bg-slate-900 min-h-[60vh]">
            {view === "model" && modelSrc ? (
              <model-viewer
                src={modelSrc}
                camera-controls
                auto-rotate
                style={{ width: "100%", height: "100%" }}
              />
            ) : images.length ? (
              <img
                src={images[index]}
                alt={`${project.title} ${index + 1}`}
                className="max-h-[70vh] w-auto object-contain"
              />
            ) : (
              <p className="text-slate-400 text-sm">
                No preview available
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden md:flex md:col-span-1 border-l border-slate-800 p-3 flex-col gap-3">
            {/* Toggle */}
            {modelSrc && (
              <button
                onClick={() =>
                  setView(view === "image" ? "model" : "image")
                }
                className="text-xs px-3 py-1 rounded border border-slate-700 hover:border-sky-500"
              >
                {view === "image" ? "View 3D model" : "View images"}
              </button>
            )}

            {/* Thumbnails */}
            {view === "image" && (
              <div className="flex flex-col gap-2">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    className={`w-full p-1 rounded ${
                      i === index
                        ? "ring-2 ring-sky-400"
                        : "hover:ring-1 hover:ring-slate-600"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumb ${i}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </aside>
        </div>

        {/* Description */}
        <div className="p-4 border-t border-slate-800 text-slate-300">
          <p className="text-sm">
            {project.summary || project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
