import React from "react";
import InnovationAdmin from "../components/InnovationAdmin";

export default function AdminInnovation() {
  if (process.env.NODE_ENV === "production") {
    return <div className="p-6 text-slate-300">Admin not available in production.</div>;
  }

  return (
    <div className="pt-10 pb-20 px-4">
      <InnovationAdmin />
    </div>
  );
}
