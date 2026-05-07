// @ts-nocheck

import { useState } from "react";

import { Upload, Send, CheckCircle2 } from "lucide-react";

import { createIncident } from "../services/api.js";

export default function ReportForm() {

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    match: "",
    date: "",
    country: "",
    category: "",
    severity: "",
    description: "",
    name: "",
    email: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {

    // BACKEND LOCAL

    await createIncident({
      country: formData.country,
      city: formData.match,
      category: formData.category,
      incidents: 1,
      severity: formData.severity,
      description: formData.description,
    });

    // N8N WEBHOOK

    await fetch(
      "https://lucianogrc.app.n8n.cloud/webhook-test/pulse-report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          match: formData.match,
          date: formData.date,
          country: formData.country,
          category: formData.category,
          severity: formData.severity,
          description: formData.description,
          name: formData.name,
          email: formData.email,
        }),
      }
    );

    // SUCCESS

    setSuccess(true);

    setFormData({
      match: "",
      date: "",
      country: "",
      category: "",
      severity: "",
      description: "",
      name: "",
      email: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);

  } catch (error) {

    console.error(error);

    alert("Something went wrong while submitting the report.");

  }
}

  return (
    <section
      id="contact"
      className="py-32 px-6 max-w-[950px] mx-auto"
    >

      <div className="space-y-12">

        {/* HEADER */}

        <div className="text-center space-y-5">

          <span className="bg-[#d9ff57] text-black px-5 py-2 rounded-full text-sm font-medium">
            Community Reporting
          </span>

          <h2 className="text-5xl font-bold">
            Report an Incident
          </h2>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Help Pulse monitor discrimination in football.
            Your contribution supports awareness, visibility,
            and safer sports communities worldwide.
          </p>

        </div>

        {/* FORM */}

        <div className="bg-white rounded-[3rem] p-12 border border-[#ececec] shadow-xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >

            {/* INCIDENT DETAILS */}

            <div className="space-y-7">

              <h3 className="text-2xl font-semibold">
                Incident Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-3">

                  <label className="text-sm text-gray-500">
                    Match/Event Name
                  </label>

                  <input
                    type="text"
                    name="match"
                    value={formData.match}
                    onChange={handleChange}
                    placeholder="e.g. AC Milan vs Inter"
                    className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
                    required
                  />

                </div>

                <div className="space-y-3">

                  <label className="text-sm text-gray-500">
                    Date of Incident
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
                    required
                  />

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-3">

                  <label className="text-sm text-gray-500">
                    Country
                  </label>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
                    required
                  >
                    <option value="">
                      Select country
                    </option>

                    <option>Italy</option>
                    <option>Spain</option>
                    <option>England</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Brazil</option>
                    <option>Mexico</option>
                    <option>Argentina</option>

                  </select>

                </div>

                <div className="space-y-3">

                  <label className="text-sm text-gray-500">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    <option>Racism</option>
                    <option>Homophobia</option>
                    <option>Sexism</option>
                    <option>Xenophobia</option>
                    <option>Other</option>

                  </select>

                </div>

              </div>

              {/* SEVERITY */}

              <div className="space-y-4">

                <label className="text-sm text-gray-500">
                  Severity Level
                </label>

                <div className="grid grid-cols-3 gap-4">

                  {["Low", "Medium", "High"].map((level) => (

                    <button
                      key={level}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          severity: level,
                        })
                      }
                      className={`px-6 py-4 rounded-2xl border transition-all ${
                        formData.severity === level
                          ? "bg-[#d9ff57] border-[#d9ff57] text-black"
                          : "bg-[#fafafa] border-[#ececec] hover:bg-[#f4f4f4]"
                      }`}
                    >
                      {level}
                    </button>

                  ))}

                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="space-y-3">

              <label className="text-sm text-gray-500">
                Description
              </label>

              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed explanation of the incident..."
                className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57] resize-none"
                required
              />

            </div>

            {/* FILE UPLOAD */}

            <div className="space-y-3">

              <label className="text-sm text-gray-500">
                Evidence (Optional)
              </label>

              <div className="border-2 border-dashed border-[#ececec] rounded-[2rem] p-12 text-center hover:border-[#d9ff57] transition-all cursor-pointer bg-[#fafafa]">

                <div className="space-y-5">

                  <div className="size-16 mx-auto rounded-full bg-[#d9ff57]/20 flex items-center justify-center">

                    <Upload className="size-8 text-black" />

                  </div>

                  <div>

                    <p className="font-semibold mb-2">
                      Upload files or drag and drop
                    </p>

                    <p className="text-sm text-gray-500">
                      Images, videos or documents supported
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* CONTACT */}

            <div className="space-y-7">

              <h3 className="text-2xl font-semibold">
                Your Information (Optional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-3">

                  <label className="text-sm text-gray-500">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
                  />

                </div>

                <div className="space-y-3">

                  <label className="text-sm text-gray-500">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
                  />

                </div>

              </div>

              <div className="bg-[#f6f6f0] rounded-2xl p-6 border border-[#ececec]">

                <p className="text-sm text-gray-500">
                  Your information is optional and will remain confidential.
                  Pulse may use it only for additional verification if needed.
                </p>

              </div>

            </div>

            {/* SUCCESS */}

            {success && (

              <div className="bg-[#d9ff57]/20 border border-[#d9ff57]/30 rounded-2xl p-5 flex items-center gap-3">

                <CheckCircle2 className="text-black" />

                <p className="text-black">
                  Incident report submitted successfully.
                </p>

              </div>

            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="w-full px-8 py-5 bg-black text-white rounded-full hover:scale-[1.01] transition-all flex items-center justify-center gap-3 text-lg font-medium"
            >

              <Send className="size-5" />

              Submit Report

            </button>

          </form>

        </div>

        {/* INFO CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-[#d9ff57]/10 rounded-[2rem] p-8 border border-[#d9ff57]/20">

            <h4 className="font-semibold mb-3">
              Confidentiality Guaranteed
            </h4>

            <p className="text-sm text-gray-500 leading-relaxed">
              All reports are managed with strict confidentiality and secure handling procedures.
            </p>

          </div>

          <div className="bg-[#f5f5f0] rounded-[2rem] p-8 border border-[#ececec]">

            <h4 className="font-semibold mb-3">
              Review Process
            </h4>

            <p className="text-sm text-gray-500 leading-relaxed">
              Reports are reviewed by the Pulse team within 48 hours and categorized for analysis.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}