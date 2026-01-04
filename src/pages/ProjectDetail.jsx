import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import db from "../data/Projects.json";
import SEOHelmet from "../components/SEOHelmet";
import ProjectImageCarousel from "../components/ProjectImageCarousel";
function isYouTube(url = "") {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  );
}

/* ================= YOUTUBE EMBED HELPER ================= */
function getYouTubeEmbedUrl(url = "") {
  if (!url) return null;

  // Playlist only
  if (url.includes("playlist?list=")) {
    const listId = url.split("list=")[1].split("&")[0];
    return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }

  // Video inside playlist
  if (url.includes("watch?v=") && url.includes("list=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    const listId = url.split("list=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}?list=${listId}`;
  }

  // Normal video
  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // youtu.be
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = db.projects || [];

  const index = useMemo(
    () => projects.findIndex(p => String(p.id) === String(id)),
    [projects, id]
  );

  const project = projects[index];
  const prevProject = projects[index - 1];
  const nextProject = projects[index + 1];

  if (!project) {
    return <main className="pt-20 text-center text-slate-400">Project not found</main>;
  }

  const {
    title,
    subtitle,
    type,
    year,
    role,
    summary,
    highlights,
    tech,
    images = [],
    model,
    links
  } = project;

  const modelSrc = typeof model === "object" ? model?.src : model;
  const youtubeEmbed = getYouTubeEmbedUrl(links?.demo);

  const [activeMedia, setActiveMedia] = useState(
    images.length ? "images" : modelSrc ? "model" : "video"
  );

  return (
    <main className="pt-10 pb-20">
      <SEOHelmet title={`${title} | Projects`} description={summary} />

      <div className="max-w-5xl mx-auto px-4 space-y-10">

        {/* ================= HEADER ================= */}
        <section>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-2">
            Project
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1">
            {title}
          </h1>

          {subtitle && <p className="text-slate-300 mb-4">{subtitle}</p>}

          <div className="flex flex-wrap gap-2 text-[11px] mb-6">
            {type && <span className="px-3 py-1 rounded-full border border-sky-500/60 text-sky-300">{type}</span>}
            {year && <span className="px-3 py-1 rounded-full border border-slate-700">{year}</span>}
            {role && <span className="px-3 py-1 rounded-full border border-emerald-500/60 text-emerald-300">{role}</span>}
          </div>

          {summary && <p className="text-sm md:text-base text-slate-300 max-w-3xl">{summary}</p>}
        </section>

        {/* ================= MEDIA TABS ================= */}
        <section>
          <div className="flex gap-2 mb-4 text-xs">
            {images.length > 0 && (
              <button onClick={() => setActiveMedia("images")}
                className={`px-4 py-1.5 rounded-full border ${activeMedia === "images"
                  ? "border-sky-500 text-sky-300 bg-sky-500/10"
                  : "border-slate-700 text-slate-300"}`}>
                Images
              </button>
            )}

            {modelSrc && (
              <button onClick={() => setActiveMedia("model")}
                className={`px-4 py-1.5 rounded-full border ${activeMedia === "model"
                  ? "border-sky-500 text-sky-300 bg-sky-500/10"
                  : "border-slate-700 text-slate-300"}`}>
                3D Model
              </button>
            )}

            {links?.demo && (
  <button
    onClick={() => setActiveMedia("video")}
    className={`px-4 py-1.5 rounded-full border ${
      activeMedia === "video"
        ? "border-sky-500 text-sky-300 bg-sky-500/10"
        : "border-slate-700 text-slate-300"
    }`}
  >
    {isYouTube(links.demo) ? "🎬 Video" : "🌐 Website"}

  </button>
)}

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

            {/* IMAGES */}
            {activeMedia === "images" && (
              <ProjectImageCarousel images={images} />
            )}

            {/* 3D MODEL */}
            {activeMedia === "model" && modelSrc && (
              <div className="h-[420px]">
                <model-viewer
                  src={modelSrc}
                  camera-controls
                  auto-rotate
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}

            {/* VIDEO / WEBSITE */}
            {activeMedia === "video" && links?.demo && (
              <div className="aspect-video bg-black">
                {youtubeEmbed ? (
                  <iframe
                    src={youtubeEmbed}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                  />
                ) : (
                  <iframe
                    src={links.demo}
                    className="w-full h-full bg-white"
                    title="Project website"
                  />
                )}
              </div>
            )}
          </div>

          {/* MEDIA ACTIONS */}
          {activeMedia === "video" && (
            <div className="flex gap-3 mt-3">
              <a href={links.demo} target="_blank" rel="noreferrer"
                className="px-4 py-2 text-xs rounded-full bg-sky-500 text-slate-950">
                Open link
              </a>
            </div>
          )}
        </section>

        {/* ================= DETAILS ================= */}
        {highlights?.length > 0 && (
          <section>
            <h3 className="font-semibold text-slate-100 mb-2">Key highlights</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
              {highlights.map(h => <li key={h}>{h}</li>)}
            </ul>
          </section>
        )}

        {tech?.length > 0 && (
          <section>
            <h3 className="font-semibold text-slate-100 mb-2">Tools & stack</h3>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {tech.map(t => (
                <span key={t} className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/70">
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ================= NAVIGATION ================= */}
        <section className="flex justify-between text-sm pt-6 border-t border-slate-800">
          {prevProject ? (
            <button onClick={() => navigate(`/projects/${prevProject.id}`)}
              className="text-sky-400 hover:underline">
              ← {prevProject.title}
            </button>
          ) : <span />}

          {nextProject && (
            <button onClick={() => navigate(`/projects/${nextProject.id}`)}
              className="text-sky-400 hover:underline ml-auto">
              {nextProject.title} →
            </button>
          )}
        </section>

        <div className="text-center">
          <Link to="/projects"
            className="inline-block px-6 py-2 rounded-full border border-slate-700 text-sm">
            All projects
          </Link>
        </div>
      </div>
    </main>
  );
}
