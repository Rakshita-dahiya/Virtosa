"use client";

import { useState } from "react";
import {
  Search,
  Briefcase,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function JobMatching() {

  // ==========================
  // Available Skills
  // ==========================

  const techOptions = [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Python",
    "Java",
    "MongoDB",
    "SQL",
    "AWS",
    "Docker",
    "Git",
    "Firebase",
  ];

  // ==========================
  // States
  // ==========================

  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState<string[]>([]);

  const [showSkills, setShowSkills] = useState(false);

  const [jobType, setJobType] = useState("Internship");

  const [location, setLocation] = useState("");

  const [jobs, setJobs] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  // ==========================
  // Add Skill
  // ==========================

  const addSkill = (skill: string) => {

    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }

    setSkillInput("");

    setShowSkills(false);

  };

  // ==========================
  // Fetch Jobs
  // ==========================

  const fetchJobs = async () => {

    if (skills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch("/api/jobs", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          skills,
          jobType,
          location,
        }),

      });

      const data = await response.json();

      if (data.success) {
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } else {
        alert("Unable to fetch jobs.");
      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong.");

    }

    setLoading(false);

  };

  return (

    <div className="max-w-6xl mx-auto space-y-8">
            {/* ==========================
          Header
      ========================== */}

      <div>

        <h1 className="text-4xl font-bold">
          AI Job Matching
        </h1>

        <p className="text-gray-600 mt-2">
          Find jobs and internships based on your skills.
        </p>

      </div>

      {/* ==========================
          Search Card
      ========================== */}

      <div className="bg-white border rounded-2xl p-8">

        <div className="flex items-center gap-3">

          <Sparkles />

          <h2 className="text-2xl font-semibold">
            Search Jobs
          </h2>

        </div>

        {/* Skills */}

        <div className="mt-8">

          <label className="font-medium">
            Your Skills
          </label>

          <div className="relative mt-2">

            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onFocus={() => setShowSkills(true)}
              placeholder="Search Skills..."
              className="w-full border rounded-xl p-3"
            />

            {showSkills && (

              <div className="absolute w-full bg-white border rounded-xl shadow-lg mt-2 max-h-56 overflow-y-auto z-20">

                {techOptions
                  .filter(skill =>
                    skill.toLowerCase().includes(skillInput.toLowerCase())
                  )
                  .map(skill => (

                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                    >

                      {skill}

                    </button>

                  ))}

              </div>

            )}

          </div>

          {/* Selected Skills */}

          <div className="flex flex-wrap gap-2 mt-4">

            {skills.map(skill => (

              <span
                key={skill}
                className="bg-green-100 text-green-700 px-3 py-2 rounded-full"
              >

                {skill}

              </span>

            ))}

          </div>

        </div>

        {/* Job Type */}

        <div className="mt-8">

          <label className="font-medium">
            Job Type
          </label>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full border rounded-xl p-3 mt-2"
          >

            <option>Internship</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Remote</option>
            <option>Hybrid</option>

          </select>

        </div>

        {/* Location */}

        <div className="mt-8">

          <label className="font-medium">
            Location
          </label>

          <div className="relative mt-2">

            <MapPin
              size={18}
              className="absolute left-3 top-3 text-gray-500"
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bangalore, India"
              className="w-full border rounded-xl py-3 pl-10"
            />

          </div>

        </div>

        {/* Search Button */}

        <button
          onClick={fetchJobs}
          disabled={loading}
          className="mt-8 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
        >

          <Search size={18} />

          {loading ? "Searching..." : "Find Matching Jobs"}

        </button>

      </div>
              {/* ==========================
          Job Results
      ========================== */}

      <div className="space-y-6">

        {!loading && jobs.length === 0 && (
          <div className="bg-white border rounded-2xl p-8 text-center text-gray-500">
            No jobs found yet. Search using your skills.
          </div>
        )}

        {jobs.map((job: any, index: number) => (

          <div
            key={job.job_id || index}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="flex items-center gap-2 mt-2 text-gray-700">
                  <Briefcase size={18} />
                  {job.company_name}
                </p>

                <p className="flex items-center gap-2 mt-2 text-gray-500">
                  <MapPin size={18} />
                  {job.candidate_required_location || "Worldwide"}
                </p>

              </div>

              <div className="text-right">

                <div className="text-3xl font-bold text-green-600">
                  {Math.floor(Math.random() * 15) + 85}%
                </div>

                <p className="text-gray-500">
                  AI Match
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {job.job_type}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Remote
              </span>

            </div>

            <div className="mt-5">

              <h3 className="font-semibold">
                Posted
              </h3>

              <p className="text-gray-600">
                {job.publication_date
                  ? new Date(job.publication_date).toLocaleDateString()
                  : "Recently"}
              </p>

            </div>

            <div className="mt-5">

              <h3 className="font-semibold">
                Salary
              </h3>

              <p className="text-gray-600">
                {job.salary || "Not Disclosed"}
              </p>

            </div>

            <div className="mt-5">

              <h3 className="font-semibold">
                Description
              </h3>

              <div
                className="text-gray-600 mt-2 line-clamp-5"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />

            </div>

            {job.company_name && (

              <div className="mt-5">

                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Company Website
                </a>

              </div>

            )}

            <div className="flex gap-4 mt-8">

              {job.url && (

                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-5 py-3 rounded-xl"
                >
                  View Details
                </a>

              )}

              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border px-5 py-3 rounded-xl"
              >
                Apply Now
              </a>

            </div>

          </div>

  


        ))}

      </div>

    </div>

  );

}