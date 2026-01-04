// src/components/InnovationAdmin.jsx
import React, { useMemo, useState } from "react";
import localData from "../data/innovation.json";
import useShowOnHomeOverrides from "../hooks/useShowOnHomeOverrides";

/**
 * Final version:
 * Your actual data shape is:
 * {
 *   "items": [ ... ]
 * }
 * So we always export back in the SAME SHAPE.
 */

export default function InnovationAdmin() {
  const { overrides, setOverride, clearAll } = useShowOnHomeOverrides();
  const [copyMsg, setCopyMsg] = useState("");

  // ALWAYS using localData.items according to your real file
  const items = useMemo(() => {
    if (!localData || !Array.isArray(localData.items)) return [];
    return localData.items;
  }, []);

  // Apply overrides
  const updatedItems = useMemo(() => {
    return items.map(it => {
      const id = it.id || it.title;
      const override = overrides.hasOwnProperty(id) ? overrides[id] : undefined;
      return {
        ...it,
        showOnHome: override !== undefined ? override : !!it.showOnHome
      };
    });
  }, [items, overrides]);

  // match EXACT original shape
  const finalPayload = useMemo(() => {
    return { items: updatedItems };
  }, [updatedItems]);

  // Download
  const downloadJson = () => {
    const json = JSON.stringify(finalPayload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "innovation.json";  // exact file to replace
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Copy JSON
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(finalPayload, null, 2));
      setCopyMsg("Copied!");
      setTimeout(() => setCopyMsg(""), 2000);
    } catch (e) {
      console.error(e);
      setCopyMsg("Copy failed");
    }
  };

  if (!items.length) {
    return (
      <div className="p-4 border border-slate-700 bg-slate-900 text-slate-300 rounded-xl">
        No innovation items found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5 p-6">
      <h2 className="text-xl font-semibold text-slate-100">Innovation Admin (Local Only)</h2>
      <p className="text-sm text-slate-400">
        Toggle <code>showOnHome</code> for items.  
        This does NOT modify your repo — stored only in your browser.
      </p>

      <div className="space-y-3">
        {updatedItems.map(item => {
          const id = item.id || item.title;

          return (
            <div
              key={id}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/60"
            >
              <div>
                <div className="text-slate-100 text-sm font-medium">{item.title}</div>
                <div className="text-slate-400 text-xs">{item.type} — {item.status}</div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  className="accent-sky-400"
                  checked={!!item.showOnHome}
                  onChange={(e) => setOverride(id, e.target.checked)}
                />
                showOnHome
              </label>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={downloadJson} className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-medium">
          Download innovation.json
        </button>

        <button onClick={copyToClipboard} className="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-medium">
          Copy JSON
        </button>

        <button onClick={clearAll} className="px-4 py-2 rounded-lg border border-slate-700 text-slate-200">
          Reset overrides
        </button>
      </div>

      {copyMsg && <p className="text-xs text-emerald-400">{copyMsg}</p>}
    </div>
  );
}
