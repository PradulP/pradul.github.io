// src/components/ModelPreview.jsx
import { useEffect, useRef, useState } from "react";

export default function ModelPreview({ src, altImage = "/placeholder-project.webp", height = "320px", onOpen = () => {} }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [supportsModelViewer, setSupportsModelViewer] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      !!window.customElements &&
      !!window.customElements.get &&
      !!window.customElements.get("model-viewer");
    setSupportsModelViewer(supported);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { root: null, rootMargin: "0px 0px 200px 0px", threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shouldUseModel = isVisible && supportsModelViewer && !!src && !loadError;

  return (
    <div ref={ref} className="reveal">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
        {shouldUseModel ? (
          <model-viewer
            src={src}
            alt="3D preview"
            camera-controls
            auto-rotate
            exposure="1"
            style={{ width: "100%", height, borderRadius: 8 }}
          />
        ) : (
          <div className="w-full h-auto rounded-md overflow-hidden bg-slate-800" style={{ height }}>
            <img src={altImage} alt="Preview fallback" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => onOpen()}
            disabled={!src}
            className="px-3 py-1 rounded bg-sky-500 text-slate-900 text-sm disabled:opacity-40"
          >
            Open model
          </button>
          <a href={altImage} className="text-xs text-slate-300 hover:underline" target="_blank" rel="noreferrer">View image</a>
        </div>
        {loadError && <div className="mt-2 text-xs text-amber-300">Model failed to load</div>}
      </div>
    </div>
  );
}
