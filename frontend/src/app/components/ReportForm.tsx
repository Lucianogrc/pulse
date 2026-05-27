// @ts-nocheck

import { useState } from "react";
import {
  Upload,
  Send,
  CheckCircle2,
} from "lucide-react";

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
      await createIncident({
        country: formData.country,
        city: formData.match,
        category: formData.category,
        incidents: 1,
        severity: formData.severity,
        description: formData.description,
      });

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

      setTimeout(() => setSuccess(false), 4000);

    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the report.");
    }
  }

  return (
    <section
      id="contact"
      className="
        py-10 md:py-24
        px-4 sm:px-6 lg:px-20
        max-w-[1100px]
        mx-auto
      "
    >
      <div className="space-y-8 md:space-y-12">

        {/* HEADER */}
        <div className="text-center space-y-4 md:space-y-5">
          <span className="bg-[#d9ff57] text-black px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium">
            Community Reporting
          </span>

          <h2 className="text-3xl md:text-5xl font-bold">
            Report an Incident
          </h2>

          <p className="text-sm md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Help Pulse monitor discrimination in football.
            Your contribution supports awareness and safer sports communities.
          </p>
        </div>

        {/* FORM */}
        <div
          className="
            bg-white
            rounded-[28px] md:rounded-[3rem]
            p-5 md:p-12
            border border-[#ececec]
            shadow-xl
          "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-10"
          >
            {/* INCIDENT DETAILS */}
            <div className="space-y-5 md:space-y-7">
              <h3 className="text-xl md:text-2xl font-semibold">
                Incident Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Input
                  label="Match/Event Name"
                  type="text"
                  name="match"
                  value={formData.match}
                  onChange={handleChange}
                  placeholder="e.g. AC Milan vs Inter"
                  required
                />

                <Input
                  label="Date of Incident"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Select
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  options={[
                    "Italy",
                    "Spain",
                    "England",
                    "Germany",
                    "France",
                    "Brazil",
                    "Mexico",
                    "Argentina",
                  ]}
                />

                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={[
                    "Racism",
                    "Homophobia",
                    "Sexism",
                    "Xenophobia",
                    "Other",
                  ]}
                />
              </div>

              {/* SEVERITY */}
              <div className="space-y-3 md:space-y-4">
                <label className="text-sm text-gray-500">
                  Severity Level
                </label>

                <div className="grid grid-cols-3 gap-2 md:gap-4">
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
                      className={`
                        px-3 md:px-6
                        py-3 md:py-4
                        rounded-2xl
                        border
                        transition-all
                        text-sm md:text-base
                        ${
                          formData.severity === level
                            ? "bg-[#d9ff57] border-[#d9ff57]"
                            : "bg-[#fafafa] border-[#ececec]"
                        }
                      `}
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
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed explanation..."
                className="w-full px-5 md:px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57] resize-none"
                required
              />
            </div>

            {/* UPLOAD */}
            <div className="space-y-3">
              <label className="text-sm text-gray-500">
                Evidence (Optional)
              </label>

              <div
                className="
                  border-2 border-dashed border-[#ececec]
                  rounded-[24px] md:rounded-[2rem]
                  p-6 md:p-10
                  text-center
                  bg-[#fafafa]
                "
              >
                <div className="space-y-4">
                  <div className="size-12 md:size-16 mx-auto rounded-full bg-[#d9ff57]/20 flex items-center justify-center">
                    <Upload className="size-6 md:size-8 text-black" />
                  </div>

                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      Upload files
                    </p>

                    <p className="text-xs md:text-sm text-gray-500">
                      Images, videos or documents
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div className="space-y-5 md:space-y-7">
              <h3 className="text-xl md:text-2xl font-semibold">
                Your Information (Optional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              <div className="bg-[#f6f6f0] rounded-2xl p-4 md:p-6 border border-[#ececec]">
                <p className="text-xs md:text-sm text-gray-500">
                  Your information is optional and remains confidential.
                </p>
              </div>
            </div>

            {success && (
              <div className="bg-[#d9ff57]/20 border border-[#d9ff57]/30 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle2 className="text-black" />
                <p className="text-black text-sm md:text-base">
                  Incident report submitted successfully.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="
                w-full
                px-8
                py-4 md:py-5
                bg-black
                text-white
                rounded-full
                hover:scale-[1.01]
                transition-all
                flex
                items-center
                justify-center
                gap-3
                text-base md:text-lg
                font-medium
              "
            >
              <Send className="size-5" />
              Submit Report
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <InfoCard
            title="Confidentiality Guaranteed"
            text="All reports are managed securely and confidentially."
            bg="bg-[#d9ff57]/10 border-[#d9ff57]/20"
          />

          <InfoCard
            title="Review Process"
            text="Reports are reviewed by the Pulse team within 48 hours."
            bg="bg-[#f5f5f0] border-[#ececec]"
          />
        </div>

      </div>
    </section>
  );
}

function Input(props) {
  return (
    <div className="space-y-2 md:space-y-3">
      <label className="text-sm text-gray-500">
        {props.label}
      </label>

      <input
        {...props}
        className="w-full px-5 md:px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="space-y-2 md:space-y-3">
      <label className="text-sm text-gray-500">
        {label}
      </label>

      <select
        {...props}
        required
        className="w-full px-5 md:px-6 py-4 bg-[#fafafa] rounded-2xl border border-[#ececec] outline-none focus:ring-2 focus:ring-[#d9ff57]"
      >
        <option value="">Select</option>

        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

function InfoCard({ title, text, bg }) {
  return (
    <div
      className={`${bg} rounded-[24px] md:rounded-[2rem] p-5 md:p-8 border`}
    >
      <h4 className="font-semibold mb-2 md:mb-3">
        {title}
      </h4>

      <p className="text-sm text-gray-500 leading-relaxed">
        {text}
      </p>
    </div>
  );
}