// src/components/ModelModal.jsx
import { useEffect } from "react";

export default function ModelModal({ open, onClose, src }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  if (!src) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">No model available</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl h-[85vh] bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
        <div className="flex items-center justify-between p-3 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-slate-100">Model view</h3>
          <div className="flex items-center gap-2">
            <a href={src} className="px-3 py-1 text-xs rounded bg-slate-800 text-slate-200">Download</a>
            <button onClick={onClose} className="px-3 py-1 text-xs rounded border border-slate-700">Close</button>
          </div>
        </div>

        <div className="w-full h-full">
          <model-viewer
            src={src}
            alt="3D model"
            camera-controls
            auto-rotate
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
