"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    education: "",
    skills: "",
    experience: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("image", image);

    const response = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("resume", JSON.stringify(data.resume));
      router.push("/resume");
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Professional Resume Builder
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            Create Your Resume
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Enter your details below and create a clean professional resume.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-10">

          <form onSubmit={handleSubmit} className="space-y-8">

            <section>
              <h2 className="mb-4 border-b pb-3 text-xl font-bold text-slate-800">
                Personal Information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">

                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

                <input
                  name="jobTitle"
                  placeholder="Job Title"
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

                <input
                  name="location"
                  placeholder="Location"
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 md:col-span-2"
                  required
                />

              </div>
            </section>

            <section>
              <h2 className="mb-4 border-b pb-3 text-xl font-bold text-slate-800">
                Professional Details
              </h2>

              <div className="space-y-4">

                <textarea
                  name="about"
                  placeholder="Professional Summary / About Me"
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

                <textarea
                  name="education"
                  placeholder="Education"
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

                <textarea
                  name="skills"
                  placeholder="Skills (HTML, CSS, JavaScript, React...)"
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

                <textarea
                  name="experience"
                  placeholder="Job Experience"
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>
            </section>

            <section>
              <h2 className="mb-4 border-b pb-3 text-xl font-bold text-slate-800">
                Profile Photo
              </h2>

              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">
                <label className="mb-2 block font-medium text-slate-700">
                  Upload your image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  className="w-full text-sm text-slate-600"
                />

                <p className="mt-2 text-sm text-slate-400">
                  JPG, PNG or WebP image recommended
                </p>
              </div>
            </section>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Create My Resume
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

