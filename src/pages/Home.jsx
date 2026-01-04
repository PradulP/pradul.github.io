// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import content from "../content.json";
import SectionTitle from "../components/SectionTitle";
import Hero from "../components/Hero";
import SEOHelmet from "../components/SEOHelmet";
import WhatIDoGrid from "../components/WhatIDoGrid";
import FeaturedSection from "../components/FeaturedSection";
import InnovationPreview from "../components/InnovationPreview";
import projectsDb from "../data/Projects.json";

export default function Home() {
  const {
    hero = {},
    about = {},
    experience = [],
    // projects = [],
     skills = {},
    blog = [],
    innovation = [],
    contact = {},
    education = [],
  } = content;
const currentRole = content.experience.find((e) => e.isCurrent);

const projects = projectsDb.projects || [];

  const primaryEmail = contact.email || "pradul.p123@gmail.com";
  const whatsappNumber = (contact.whatsapp || "918078376902").replace(/[^0-9]/g, "");
  const location = contact.location || "Kannur, Kerala, India";

  const cardHover = "transform transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(2,6,23,0.35)]";

  return (
    <main className="pt-6 md:pt-10 pb-12">
      <SEOHelmet title={`${hero.name || "Pradul P"} — Civil Engineer & BIM Specialist`} description={hero.tagline} image={hero.avatar || "/pradul-avatar.jpg"} />

      <Hero hero={hero} location={location} />

      {/* ABOUT preview */}
      <section className="mb-10">
        <SectionTitle>About</SectionTitle>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl">
          {about.paragraphs?.[0] ?? "Civil engineer and BIM enthusiast working across site, design, and digital tools."}
        </p>
        <Link to="/about" className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline">Read full about me →</Link>
      </section>

      {/* Experience & Education preview */}
      <section className="mb-10">
        <SectionTitle>Experience &amp; Education</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
          {experience[0] && (
            <article className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 text-xs md:text-sm text-slate-300 hover:border-sky-500/60 ${cardHover}`}>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="font-semibold">{experience[0].role}</h3>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{experience[0].period}</span>
              </div>
              <p className="text-slate-400 mb-2">{experience[0].company} · {experience[0].location}</p>
              <ul className="list-disc list-inside space-y-1">
                {experience[0].points?.slice(0, 3).map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </article>
          )}
          {education[0] && (
            <article className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5 text-xs md:text-sm text-slate-300 hover:border-sky-500/60 ${cardHover}`}>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="font-semibold">{education[0].degree}</h3>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{education[0].period}</span>
              </div>
              <p className="text-slate-400 mb-2">{education[0].place || education[0].institution}</p>
              {education[0].note && <p className="text-slate-300 text-xs">{education[0].note}</p>}
            </article>
          )}
        </div>
        <Link to="/experience" className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline">View full experience →</Link>
      </section>

      {/* Featured projects (component) */}
       <SectionTitle>Projects</SectionTitle>
      <FeaturedSection projects={projects} maxItems={6} />

      {/* What I do grid */}
       <SectionTitle>What I do </SectionTitle>
      <WhatIDoGrid items={content.whatIDo || []} />

      {/* SKILLS snapshot */}
      <section className="mb-10">
        <SectionTitle>Skills snapshot</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {(skills.civilBim || []).concat(skills.web || []).slice(0, 12).map((s, i) => (
            <span key={s + i} className="px-3 py-2 rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transform transition hover:-translate-y-1 hover:shadow-md hover:border-sky-500/60">
              {s}
            </span>
          ))}
        </div>
        <Link to="/skills" className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline">View full skill map →</Link>
      </section>

{((Array.isArray(content.innovation) ? content.innovation : (content.innovation?.items ?? []))).length > 0 && (
  <section className="mb-10">
    <SectionTitle>Innovation &amp; tools</SectionTitle>

    {/* InnovationPreview will respect showOnHome overrides from your admin UI */}
    <InnovationPreview
      limit={2}
      onOpen={(item) => {
        // Option: navigate to /innovation (or open modal if you later wire it)
        // For now we just navigate to the full Innovation page:
        window.location.href = "/innovation";
      }}
    />

    <Link to="/innovation" className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline">Explore all experiments →</Link>
  </section>
)}
      {/* Latest note */}
      <section className="mb-10">
        <SectionTitle>Latest note</SectionTitle>
        {blog?.[0] ? (
          <article className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-4  hover:border-sky-500/60 ${cardHover}`}>
            <h3 className="font-semibold">{blog[0].title}</h3>
            <p className="text-slate-300 mt-2">{blog[0].summary}</p>
          </article>
        ) : (
          <article className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-slate-300 ${cardHover}`}>No notes yet.</article>
        )}
        <Link to="/blog" className="inline-block mt-3 text-xs md:text-sm text-sky-400 hover:underline">View all notes →</Link>
      </section>

      {/* Contact preview */}
      <section className="mb-4">
        <SectionTitle>Let's talk</SectionTitle>
        <div className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 hover:border-sky-500/60 ${cardHover}`}>
          <div className="flex-1">
            <p className="text-sm md:text-base text-slate-300 max-w-3xl mb-2">
              Have a BIM task, drawing set, site coordination issue, or want to discuss tools for your team? I'm open to freelance help, small collaborations, and learning-focused projects.
            </p>
            <div className="flex flex-wrap gap-3 text-xs md:text-sm">
              <Link to="/contact" className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium transition">Go to contact page</Link>
              <a href={`mailto:${primaryEmail}`} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/70 hover:border-red-500 transition" rel="noopener noreferrer">Email: {primaryEmail}</a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-slate-700 bg-slate-900/70 hover:border-emerald-400 transition">WhatsApp: +{whatsappNumber}</a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-8" />
    </main>
  );
}
