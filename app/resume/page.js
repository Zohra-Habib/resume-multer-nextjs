"use client";

import { useEffect, useState } from "react";

export default function Resume() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("resume");

    if (data) {
      setResume(JSON.parse(data));
    }
  }, []);

  if (!resume) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-slate-800">
            No Resume Found
          </h1>
          <p className="mt-2 text-slate-500">
            Please create your resume first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">

        <div className="bg-slate-900 px-8 py-10 text-white sm:px-12">
          <div className="flex flex-col items-center gap-6 sm:flex-row">

            {resume.image && (
              <img
                src={resume.image}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold">
                {resume.name}
              </h1>

              <p className="mt-2 text-xl text-slate-300">
                {resume.jobTitle}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-300 sm:justify-start">
                <span>{resume.email}</span>
                <span>{resume.phone}</span>
                <span>{resume.location}</span>
              </div>
            </div>

          </div>
        </div>

        <div className="grid gap-10 p-8 sm:p-12 md:grid-cols-3">

          <aside className="md:col-span-1">
            <h2 className="border-b-2 border-slate-900 pb-2 text-lg font-bold text-slate-900">
              Contact
            </h2>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <strong className="block text-slate-800">Email</strong>
                {resume.email}
              </p>

              <p>
                <strong className="block text-slate-800">Phone</strong>
                {resume.phone}
              </p>

              <p>
                <strong className="block text-slate-800">Location</strong>
                {resume.location}
              </p>
            </div>
          </aside>

          <section className="space-y-8 md:col-span-2">

            <div>
              <h2 className="border-b-2 border-slate-900 pb-2 text-lg font-bold text-slate-900">
                Professional Summary
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {resume.about}
              </p>
            </div>

            <div>
              <h2 className="border-b-2 border-slate-900 pb-2 text-lg font-bold text-slate-900">
                Education
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                {resume.education}
              </p>
            </div>

            <div>
              <h2 className="border-b-2 border-slate-900 pb-2 text-lg font-bold text-slate-900">
                Skills
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                {resume.skills}
              </p>
            </div>

            <div>
              <h2 className="border-b-2 border-slate-900 pb-2 text-lg font-bold text-slate-900">
                Experience
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                {resume.experience || "No experience added."}
              </p>
            </div>

          </section>

        </div>
      </div>
    </main>
  );
}

